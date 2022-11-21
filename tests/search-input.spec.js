/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SearchBox from '../components/search-input'

describe('Search Input', () => {
    it('updates on text change and performs debounced search', async () => {
      const onTextChange = jest.fn((value) => {})
      
      const { queryByPlaceholderText } = render(<SearchBox onTextChange={onTextChange}/>)
  
      const searchInput = queryByPlaceholderText('Search here...')
  
      fireEvent.change(searchInput, { target: { value: 'test' } })
  
      expect(searchInput.value).toBe('test')
      expect(onTextChange).not.toHaveBeenCalledWith('test');
      await waitFor(() => expect(onTextChange).toHaveBeenCalledWith('test'), { timeout: 550 });
    })
  })