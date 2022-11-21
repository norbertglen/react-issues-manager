import React from "react";
import { useMutation } from "graphql-hooks";
import ErrorMessage from "../../components/alert";

const UPDATE_ISSUE = `
mutation updateIssue($id: ID! $title: String $state: IssueState) {
  updateIssue(input: {id: $id, title: $title, state: $state}) {
    issue {
      id
      number
      title
      state
      createdAt
      author {
        login
        url
      }
      url
    }
  }
}`;

export default function IssueUpdateForm({ issue, onSubmission }) {
  const [updateIssue, { loading, error }] = useMutation(UPDATE_ISSUE);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = event.target;
      const formData = new window.FormData(form);
      const title = formData.get("title");
      const state = formData.get("state");
      form.reset();
      const result = await updateIssue({
        variables: {
          id: issue.id,
          title,
          state,
        },
      });
      onSubmission && onSubmission(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Editing Issue #{issue.number}</h1>
      <input
        placeholder="title"
        name="title"
        type="text"
        role="input"
        defaultValue={issue.title}
      />
      <select name="state" role="select" defaultValue={issue.state}>
        <option value="OPEN">OPEN</option>
        <option value="CLOSED">CLOSED</option>
      </select>
      {error ? <ErrorMessage message="Unable to update issue." /> : null}
      <button type="submit">{loading ? "Saving..." : "Save"}</button>
    </form>
  );
}
