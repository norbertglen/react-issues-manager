import React from "react";

export default function IssuesListItem({ issue }) {
  const creationDate = new Date(issue.createdAt).toLocaleString();
  const handleDelete = () => {};
  const handleEdit = () => {};

  return (
    <tr role="listItem">
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
      <td>
        <div className="action-buttons">
          <button className="default" role="button" onClick={handleDelete}>
            Delete
          </button>
          <button className="default" role="button" onClick={handleEdit}>
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}
