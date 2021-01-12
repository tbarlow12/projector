<!-- THIS DOCUMENT IS AUTO-GENERATED -->

# Commands

- [`pjr`](#pjr) - Root command for the Projector CLI
  - [`pjr agile`](#pjr-agile) - Agile Configuration Management
    - [`pjr agile sprints`](#pjr-agile-sprints) - Sprint Management
      - [`pjr agile sprints create`](#pjr-agile-sprints-create) - Create Sprints with Agile Provider
    - [`pjr agile work`](#pjr-agile-work) - Work Item Management
      - [`pjr agile work create`](#pjr-agile-work-create) - Work Item Creation
      - [`pjr agile work template`](#pjr-agile-work-template) - Work Item Templates
        - [`pjr agile work template init`](#pjr-agile-work-template-init) - Initialize work item template
        - [`pjr agile work template list`](#pjr-agile-work-template-list) - List available work item templates
  - [`pjr links`](#pjr-links) - Commonly used links in CSE
    - [`pjr links snowball`](#pjr-links-snowball) - Track your work in CSE
    - [`pjr links playbook`](#pjr-links-playbook) - The Code-With Engineering Playbook
    - [`pjr links playbook-issues`](#pjr-links-playbook-issues) - Issues in the Code-With Engineering Playbook
  - [`pjr playbook`](#pjr-playbook) - Interacting with the Code-With-Engineering Playbook
    - [`pjr playbook issues`](#pjr-playbook-issues) - Interacting with issues in the code-with engineering playbook
      - [`pjr playbook issues create`](#pjr-playbook-issues-create) - Create a playbook issue
      - [`pjr playbook issues open`](#pjr-playbook-issues-open) - View issues in the code-with engineering playbook
    - [`pjr playbook template`](#pjr-playbook-template) - Discover and use templates from the code-with engineering playbook
      - [`pjr playbook template copy`](#pjr-playbook-template-copy) - Copy templates from playbook to local working directory
  - [`pjr project`](#pjr-project) - Local Projector configuration
    - [`pjr project init`](#pjr-project-init) - Initialize local projector configuration

## `pjr`

```
Usage: pjr [options] [command]

Root command for the Projector CLI

Options:
  -h, --help  display help for command

Commands:
  agile       Agile Configuration Management
  links       Commonly used links in CSE
  playbook    Interacting with the Code-With-Engineering Playbook
  project     Local Projector configuration
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
  -t, --template <template>  Work item template (run 'pjr agile work template list' to view
                             available templates)
  -o, --out-file <out-file>  Output file name for initialized work item template. Defaults
                             to using 'backlogItems.json' if not provided
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

Commonly used links in CSE

Options:
  -h, --help       display help for command

Commands:
  snowball         Track your work in CSE
  playbook         The Code-With Engineering Playbook
  playbook-issues  Issues in the Code-With Engineering Playbook
  help [command]   display help for command
```
## `pjr links snowball`

```
Usage: pjr links snowball [options]

Track your work in CSE

Options:
  -h, --help  display help for command
```
## `pjr links playbook`

```
Usage: pjr links playbook [options]

The Code-With Engineering Playbook

Options:
  -h, --help  display help for command
```
## `pjr links playbook-issues`

```
Usage: pjr links playbook-issues [options]

Issues in the Code-With Engineering Playbook

Options:
  -h, --help  display help for command
```
## `pjr playbook`

```
Usage: pjr playbook [options] [command]

Interacting with the Code-With-Engineering Playbook

Options:
  -h, --help      display help for command

Commands:
  issues          Interacting with issues in the code-with engineering playbook
  template        Discover and use templates from the code-with engineering playbook
  help [command]  display help for command
```
## `pjr playbook issues`

```
Usage: pjr playbook issues [options] [command]

Interacting with issues in the code-with engineering playbook

Options:
  -h, --help      display help for command

Commands:
  create          Create a playbook issue
  open            View issues in the code-with engineering playbook
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

View issues in the code-with engineering playbook

Options:
  -h, --help  display help for command
```
## `pjr playbook template`

```
Usage: pjr playbook template [options] [command]

Discover and use templates from the code-with engineering playbook

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
  -b, --branch <branch>              Branch of playbook repo to use
  -g, --github-token <github-token>  GitHub personal access token. Not required, but
                                     increases number of allowed requests
  -p, --path <template-path>         Path to template within playbook repo
  -o, --out-path <out-path>          Local path to which file will be written. Defaults to
                                     name of template file in the working directory. Will
                                     overwrite existing file
  -h, --help                         display help for command
```
## `pjr project`

```
Usage: pjr project [options] [command]

Local Projector configuration

Options:
  -h, --help      display help for command

Commands:
  init [options]  Initialize local projector configuration
  help [command]  display help for command
```
## `pjr project init`

```
Usage: pjr project init [options]

Initialize local projector configuration

Options:
  -a, --agile-provider <agile-provider>  Agile provider (currently only supports 'azdo')
                                         (default: "azdo")
  -h, --help                             display help for command
```