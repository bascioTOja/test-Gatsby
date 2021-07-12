import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import _ from 'lodash'
import React, { useState } from 'react'

import { NavMainItemProps } from '../../../../types'
import { linkResolver } from '../../../../utils/linkResolver'
import CommonLink from '../../Link'
import * as classes from './style.module.css'

const Item = ({ item, closeDrawer }: { item: NavMainItemProps; closeDrawer: () => void }) => {
  const [open, setOpenState] = useState<boolean>(false)

  const leadItem =
    item.primary.link.link_type === 'Web' ? (
      <a
        rel="noopener"
        onClick={() => closeDrawer()}
        target={_.get(item, 'primary.link.target')}
        href={_.get(item, 'primary.link.url', '#')}
      >
        <ListItemText primary={item.primary.link_name.text} className={classes.item__text} />
      </a>
    ) : (
      <CommonLink to={item.primary.link.document ? linkResolver(item.primary.link.document) : '#'} onClick={() => closeDrawer()}>
        <ListItemText primary={item.primary.link_name.text} className={classes.item__text} />
      </CommonLink>
    )

  if (item.items.length > 0) {
    return (
      <>
        <ListItem className={classes.navbar__item} button>
          {leadItem}
          {open ? <ExpandLess onClick={() => setOpenState(!open)} /> : <ExpandMore onClick={() => setOpenState(!open)} />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {item.items.map((nestedItem, index) => (
              <ListItem key={'MN' + (nestedItem.link.id ? nestedItem.link.id : nestedItem.link.url + index.toString())} className={classes.navbar__item}>
                {nestedItem.link.link_type === 'Web' ? (
                  <a rel="noopener" target={_.get(nestedItem, 'link.target', undefined)} href={_.get(nestedItem, 'link.url', '#')}>
                    <ListItemText primary={nestedItem.link_name.text} className={`${classes.item__text} ${classes.item__nested}`} />
                  </a>
                ) : (
                  <CommonLink to={nestedItem.link.document ? linkResolver(nestedItem.link.document) : '#'} onClick={() => closeDrawer()}>
                    <ListItemText primary={nestedItem.link_name.text} className={`${classes.item__text} ${classes.item__nested}`} />
                  </CommonLink>
                )}
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    )
  }

  return (
    <ListItem className={classes.navbar__item} button>
      {leadItem}
    </ListItem>
  )
}

export default React.memo(Item)
