import { MemberProps } from 'gatsby-source-protrainup/typescript/types/member'
import React from 'react'
import { useTranslation } from 'react-i18next'

import HeaderCard from '../common/Cards/headerCard'
import Member from './member'

const Members = ({ members }: { members: Array<MemberProps> }) => {
  const { t } = useTranslation()

  return (
    <div>
      <HeaderCard text={t('Crew')} />
      {members.map((member) => (
        <Member key={member.id} member={member} />
      ))}
    </div>
  )
}

export default React.memo(Members)
