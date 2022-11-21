import React from "react";
import { useReducer } from "react";
import DeleteButton from "./delete-button";
import IssueUpdateForm from "./issue-update-form";

export default function IssuesListItem({ issue, handleRefetch }) {
  const [editMode, toggleEditMode] = useReducer((state) => !state, false);
  const creationDate = new Date(issue.createdAt).toLocaleString();

  return (
    <tr role="listItem">
      {editMode ? (
        <td colSpan={4}>
          <IssueUpdateForm issue={issue} onSubmission={handleRefetch} />
        </td>
      ) : (
        <>
          <td>{creationDate}</td>
          <td>
            <a href={issue.url} target="_blank">
              {issue.title}
            </a>
          </td>
          <td>
            <a href={issue?.author?.url} target="_blank">
              {issue?.author?.login}
            </a>
          </td>
          <td>{issue.state}</td>
        </>
      )}
      <td>
        <div className="action-buttons">
          {!editMode ? (
            <DeleteButton id={issue.id} onDelete={handleRefetch} />
          ) : null}
          <button className="default" role="button" onClick={toggleEditMode}>
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>
      </td>
    </tr>
  );
}
