import ora from "ora";
import axios from "axios";
import { Repository } from "@polemic/binder";
// import {
//   BibliographyAdapter,
//   ConfigAdapter,
//   DocumentsAdapter,
// } from "@polemic/binder/adapters/fs";

import { POLEMIC_PUB_API } from "../helpers/constants.js";
import { getJwt } from "../helpers/utils.js";

export default async function publishCommand() {
  const repository = new Repository({
    projectDir: process.cwd(),
    adapters: [
      // new ConfigAdapter(),
      // new DocumentsAdapter(),
      // new BibliographyAdapter(),
    ],
  });

  await repository.initialize();

  const name = repository.projectDir.split("/").slice(-1)[0];

  const spinner = ora().start(`Publishing ${name}`);

  try {
    const jwt = await getJwt();
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    let projectId = repository.config!.config?.pub?.projectId;

    // Create a new project if there is none
    if (!projectId) {
      spinner.text = `Creating a new project`;

      projectId = (
        await axiosInstance.post<{ _id: string }>(
          `${POLEMIC_PUB_API}/projects`,
          { name }
        )
      ).data._id;
      spinner.succeed(`Created new project`);

      await repository.config!.update({ pub: { projectId } });
      spinner.succeed(`Updated your config file`);
    }

    // Upload documents
    spinner.start("Uploading documents");
    const numDocuments = repository.documents!.files.length;
    await Promise.all(
      repository.documents!.files.map(async ({ uri, content }) => {
        await axiosInstance.post(`${POLEMIC_PUB_API}/projects/documents`, {
          uri,
          content,
        });
      })
    );
    spinner.succeed(
      `Uploaded ${numDocuments} document${numDocuments !== 1 ? "s" : ""}`
    );

    // Upload bibliography
    spinner.start("Uploading bibliography");
    const numBib = repository.bibliography!.files.length;
    await Promise.all(
      repository.documents!.files.map(async ({ uri, content }) => {
        await axiosInstance.post(`${POLEMIC_PUB_API}/projects/bibliographies`, {
          uri,
          content,
        });
      })
    );

    spinner.succeed(
      `Uploaded ${numBib} bibliography file${numBib !== 1 ? "s" : ""}`
    );

    // Upload config
    spinner.start("Uploading configuration");
    await axiosInstance.post(
      `${POLEMIC_PUB_API}/projects/config`,
      repository.config!.config
    );
    spinner.succeed("Uploaded configuration");

    // Done!
    spinner.info(`Project published at https://polemic.pub/${projectId}`);
  } catch (e) {
    spinner.fail("Could not publish project");
  }
}
