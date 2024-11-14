import React from 'react';
import { useStore } from '@/store';
import AgentDataBoard from './common/agent-data-board';
import OrgDataBoard from './common/org-data-board';

function DataPage(props) {
  const { identity } = useStore('identity');
  const isOrg = identity?.org;

  return isOrg ? <OrgDataBoard {...props} /> : <AgentDataBoard {...props} />;
}

export default {
  name: 'Data',
  component: DataPage,
  options: {
    pageName: 'data_page',
    tabBarLabel: '数据',
    headerShown: false,
  },
};
