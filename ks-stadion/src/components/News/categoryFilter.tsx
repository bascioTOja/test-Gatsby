import chroma from 'chroma-js'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Select from 'react-select'

import { PrismicCategoryProps } from '../../prismic/types'
import * as classes from './style.module.css'

const CategoryFilter = ({ setCategories }: { setCategories: (values: Array<string>) => void }) => {
  const colourStyles = {
    control: (styles: any) => ({ ...styles, boxShadow: 'none', border: 'none' }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
        color: isDisabled ? '#ccc' : isSelected ? (chroma.contrast(color, 'white') > 2 ? 'white' : 'black') : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default'
      }
    },
    indicatorSeparator: () => ({
      display: 'none'
    }),
    multiValue: (styles: any, { data }: any) => {
      const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css()
      }
    },
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      color: chroma.contrast(data.color, chroma(data.color).alpha(0.1)) > 2 ? 'white' : 'black'
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white'
      }
    })
  }

  const {
    allPrismicCategory
  }: {
    allPrismicCategory: {
      nodes: Array<PrismicCategoryProps>
    }
  } = useStaticQuery(graphql`
    query {
      allPrismicCategory(filter: { data: { category_name: { text: { ne: "" } } } }) {
        ...PrismicCategoryConnectionFragment
      }
    }
  `)

  const processedCategories = allPrismicCategory.nodes.map((category) => ({
    value: category.data.category_name.text,
    color: category.data.color,
    label: category.data.category_name.text
  }))

  const handleChange = (selectedOptions: any) => {
    setCategories(selectedOptions.map((option: any) => option.value))
  }

  return (
    <div className={classes.filter}>
      <span className={classes.filter__name}>Kategorie</span>
      <Select
        placeholder="Wybierz kategorię"
        noOptionsMessage={() => 'Brak kategorii'}
        onChange={handleChange}
        className={classes.react__select}
        closeMenuOnSelect={false}
        isMulti
        isClearable={false}
        isSearchable={true}
        options={processedCategories}
        styles={colourStyles}
      />
    </div>
  )
}

export default React.memo(CategoryFilter)
