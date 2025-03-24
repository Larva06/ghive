# ghive 🐝

This tool automatically accepts ownership transfer requests of Google Drive files to a Service Account.
It frees up the storage of the original owner and allows the Service Account to manage the files.

## Usage

A GitHub Actions workflow is provided to run this tool on a schedule.
It will check for ownership transfer requests every hour and accept them if they exist.

## Secrets

The tool requires some secrets to be set in your GitHub repository.
See [`src/env.ts`](src/env.ts) for the list of required secrets.
