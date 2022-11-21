import React, { useEffect } from 'react'
import { useMutation } from 'graphql-hooks'

const DELETE_ISSUE = `
  mutation deleteIssue($id: String!) {
    deleteIssue(input: {issueId: $id}) {
      clientMutationId
    }
  }
`

export default function DeleteButton({ id, onDelete }) {
  const [deleteIssue, { error, loading, data }] = useMutation(DELETE_ISSUE)
  const handleDelete = async () => {
    try {
      if(confirm("Are you sure you want to delete this?")) {
        await deleteIssue({
          variables: {
            id,
          },
        })
  
        if (data) {
          onDelete && onDelete()
        }
      }
      
    } catch (e) {
      console.error('error deleting issue', e)
    }
  }
  useEffect(() => {
    if (error) {
      console.log(error)
      alert("Issue deletion failed.")
    }
  }, [error])

  return (
    <button
      className="danger"
      onClick={handleDelete}
      disabled={loading}
    >
      Delete
    </button>
  )
}
