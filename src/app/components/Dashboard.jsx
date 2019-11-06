

import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList'


export const Dashboard = ({groups}) => (

	<div>
		<h2>Dashboard - Groups</h2>
		{groups.map(group=>(
		/* <!-- <div>
						{group.name}
				 </div> --> */

				 <ConnectedTaskList key = {group.id} id = {group.id} name = {group.name}/>

	))}
	</div>

);

function mapStateToProps(state){
	return {
		groups:state.groups
	}
}

export const ConnectedDashboard  = connect(mapStateToProps) (Dashboard);
