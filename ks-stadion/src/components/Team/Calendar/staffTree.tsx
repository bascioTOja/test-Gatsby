import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TreeItem from '@material-ui/lab/TreeItem'
import TreeView from '@material-ui/lab/TreeView'
import { StaffProps } from 'gatsby-source-protrainup/typescript/types/training'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { groupBy } from '../../../utils'
import * as classes from './style.module.css'

const StaffTree = ({ staff }: { staff: Array<StaffProps> }) => {
  const { t } = useTranslation()
  const groupedStaff = groupBy(staff, 'role')

  return (
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      {Object.keys(groupedStaff).map((groupKey) => (
        <TreeItem className={classes.tree_item} key={groupKey} label={t(groupKey)} nodeId={groupKey}>
          {groupedStaff[groupKey].map((person, index) => (
            <TreeItem className={classes.tree_item} key={index} nodeId={person.full_name + person.role} label={person.full_name} />
          ))}
        </TreeItem>
      ))}
    </TreeView>
  )
}

export default React.memo(StaffTree)
