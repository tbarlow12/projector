import { BacklogItem, BacklogItemType } from "../../models";

export const defaultBacklogItems: BacklogItem[] = [
  {
    name: "As a developer, I have automated linting to enforce code style for the protected branches of the ______ project",
    type: BacklogItemType.Story,
    description: "We need linting. Linting is good",
    acceptanceCriteria: [
      "There is a single command to run linting from the terminal",
      "Linting is triggered on all pull requests to protected branches",
      "Linting failure causes CI pipeline to fail",
      "CI failure blocks PR merge"
    ],
    assignedTo: "john.stockton@microsoft.com",
    children: [
      {
        name: "Configure linter",
        type: BacklogItemType.Task,
      },
      {
        name: "Set up linting in CI pipeline",
        type: BacklogItemType.Task,
      }
    ],
  },
  {
    name: "Sample Epic",
    type: BacklogItemType.Epic,
    description: "This is my sample epic. A backlog item file does not need to have a hierarchical structure. " +
    "A file could contain just a list of bugs, tasks, stories, features or epics. " +
    "Since they all have the same data type and properties, you can structure your file as you wish.",
    children: [
      {
        name: "Sample Feature",
        type: BacklogItemType.Feature,
        description: "This is my sample feature",
        children: [
          {
            name: "Sample Story",
            type: BacklogItemType.Story,
            description: "This is my sample story",
            children: [
              {
                name: "Sample Task",
                type: BacklogItemType.Task,
                description: "This is my sample task",
              },
              {
                name: "Sample Bug",
                type: BacklogItemType.Bug,
                description: "This is my sample bug",
                acceptanceCriteria: [
                  "The bug is fixed"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
]  
