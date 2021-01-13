<!-- THIS DOCUMENT IS AUTO-GENERATED -->

# Commands

- [`pjr`](#pjr) - Projector CLI
  - [`pjr agile`](#pjr-agile) - Agile Configuration Management
    - [`pjr agile sprints`](#pjr-agile-sprints) - Sprint Management
      - [`pjr agile sprints create`](#pjr-agile-sprints-create) - Create Sprints with Agile Provider
    - [`pjr agile work`](#pjr-agile-work) - Work Item Management
      - [`pjr agile work create`](#pjr-agile-work-create) - Work Item Creation
      - [`pjr agile work template`](#pjr-agile-work-template) - Work Item Templates
        - [`pjr agile work template init`](#pjr-agile-work-template-init) - Initialize work item template
        - [`pjr agile work template list`](#pjr-agile-work-template-list) - List available work item templates
  - [`pjr links`](#pjr-links) - Open useful links
    - [`pjr links snowball`](#pjr-links-snowball) - Used for tracking work
    - [`pjr links playbook`](#pjr-links-playbook) - CSE playbook for the way we do work
    - [`pjr links playbook`](#pjr-links-playbook) - Issues in the CSE Playbook
  - [`pjr playbook`](#pjr-playbook) - Interacting with a playbook
    - [`pjr playbook issues`](#pjr-playbook-issues) - Playbook Issues
      - [`pjr playbook issues create`](#pjr-playbook-issues-create) - Create a playbook issue
      - [`pjr playbook issues open`](#pjr-playbook-issues-open) - Open browser with Playbook Issues
    - [`pjr playbook template`](#pjr-playbook-template) - Discover and use templates from playbook
      - [`pjr playbook template copy`](#pjr-playbook-template-copy) - Copy templates from playbook to local working directory
  - [`pjr project`](#pjr-project) - Project configuration
    - [`pjr project init`](#pjr-project-init) - Initialize local projector configuration in `projector.json` file

## `pjr`

```
Usage: pjr [options] [command]

Projector CLI

Options:
  -h, --help  display help for command

Commands:
  agile       Agile Configuration Management
  links       Open useful links
  playbook    Interacting with a playbook
  project     Project configuration
```
## `pjr agile`

```
Usage: pjr agile [options] [command]

Agile Configuration Management

Options:
  -h, --help      display help for command

Commands:
  sprints         Sprint Management
  work            Work Item Management
  help [command]  display help for command
```
## `pjr agile sprints`

```
Usage: pjr agile sprints [options] [command]

Sprint Management

Options:
  -h, --help      display help for command

Commands:
  create          Create Sprints with Agile Provider
  help [command]  display help for command
```
## `pjr agile sprints create`

```
Usage: pjr agile sprints create [options]

Create Sprints with Agile Provider

Options:
  -h, --help  display help for command
```
## `pjr agile work`

```
Usage: pjr agile work [options] [command]

Work Item Management

Options:
  -h, --help        display help for command

Commands:
  create [options]  Work Item Creation
  template          Work Item Templates
  help [command]    display help for command
```
## `pjr agile work create`

```
Usage: pjr agile work create [options]

Work Item Creation

Options:
  -f, --file <file>  File containing backlog item template
  -h, --help         display help for command
```
## `pjr agile work template`

```
Usage: pjr agile work template [options] [command]

Work Item Templates

Options:
  -h, --help      display help for command

Commands:
  init [options]  Initialize work item template
  list            List available work item templates
  help [command]  display help for command
```
## `pjr agile work template init`

```
Usage: pjr agile work template init [options]

Initialize work item template

Options:
  -t, --template <template>  Template to use for work items
  -o, --out-file <out-file>  Output file for work item template
  -h, --help                 display help for command
```
## `pjr agile work template list`

```
Usage: pjr agile work template list [options]

List available work item templates

Options:
  -h, --help  display help for command
```
## `pjr links`

```
Usage: pjr links [options] [command]

Open useful links

Options:
  -h, --help      display help for command

Commands:
  snowball        Used for tracking work
  playbook        CSE playbook for the way we do work
  playbook        Issues in the CSE Playbook
  help [command]  display help for command
```
## `pjr links snowball`

```
Usage: pjr links snowball [options]

Used for tracking work

Options:
  -h, --help  display help for command
```
## `pjr links playbook`

```
Usage: pjr links playbook [options]

CSE playbook for the way we do work

Options:
  -h, --help  display help for command
```
## `pjr links playbook`

```
Usage: pjr links playbook [options]

Issues in the CSE Playbook

Options:
  -h, --help  display help for command
```
## `pjr playbook`

```
Usage: pjr playbook [options] [command]

Interacting with a playbook

Options:
  -h, --help      display help for command

Commands:
  issues          Playbook Issues
  template        Discover and use templates from playbook
  help [command]  display help for command
```
## `pjr playbook issues`

```
Usage: pjr playbook issues [options] [command]

Playbook Issues

Options:
  -h, --help      display help for command

Commands:
  create          Create a playbook issue
  open            Open browser with Playbook Issues
  help [command]  display help for command
```
## `pjr playbook issues create`

```
Usage: pjr playbook issues create [options]

Create a playbook issue

Options:
  -h, --help  display help for command
```
## `pjr playbook issues open`

```
Usage: pjr playbook issues open [options]

Open browser with Playbook Issues

Options:
  -h, --help  display help for command
```
## `pjr playbook template`

```
Usage: pjr playbook template [options] [command]

Discover and use templates from playbook

Options:
  -h, --help      display help for command

Commands:
  copy [options]  Copy templates from playbook to local working directory
  list            Not yet implemented
  help [command]  display help for command
```
## `pjr playbook template copy`

```
Usage: pjr playbook template copy [options]

Copy templates from playbook to local working directory

Options:
  -b, --branch <branch>              Branch of playbook to use
  -g, --github-token <github-token>  GitHub personal access token
  -p, --path <template-path>         Path to template within playbook repo
  -o, --out-path <out-path>          Local path to which file will be written. Defaults to name of template file
  -h, --help                         display help for command
```
## `pjr project`

```
Usage: pjr project [options] [command]

Project configuration

Options:
  -h, --help      display help for command

Commands:
  init [options]  Initialize local projector configuration in `projector.json` file
  help [command]  display help for command
```
## `pjr project init`

```
Usage: pjr project init [options]

Initialize local projector configuration in `projector.json` file

Options:
  -a, --agile-provider <agile-provider>  Agile provider (currently only supports and defaults to 'azdo') (default: "azdo")
  -u, --base-url <base-url>              Base URL for Agile Provider project
  -p, --project <project>                Agile provider project
  -t, --token <token>                    Agile provider access token
  -h, --help                             display help for command
```