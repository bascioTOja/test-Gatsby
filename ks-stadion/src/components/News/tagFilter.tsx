import React from 'react'
import Select from 'react-select'

import * as classes from './style.module.css'

const TagFilter = ({
  tags,
  setTags,
  defaultValue
}: {
  defaultValue?: Array<{ label: string; value: string }>
  tags: Array<{ label: string; value: string }>
  setTags: (newTags: Array<string>) => void
}) => {
  const handleChange = (selectedOptions: any) => {
    setTags(selectedOptions.map((option: any) => option.value))
  }

  return (
    <div className={classes.filter}>
      <span className={classes.filter__name}>Tagi</span>
      <Select
        defaultValue={defaultValue}
        placeholder="Wybierz tag"
        noOptionsMessage={() => 'Brak tagów'}
        onChange={handleChange}
        className={classes.react__select}
        closeMenuOnSelect={false}
        isMulti
        isClearable={false}
        isSearchable={true}
        options={tags}
        styles={{
          control: (styles: any) => ({ ...styles, boxShadow: 'none', border: 'none' }),
          indicatorSeparator: () => ({
            display: 'none'
          })
        }}
      />
    </div>
  )
}

export default React.memo(TagFilter)
