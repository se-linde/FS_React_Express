import {
  take,
  put,
  select
} from 'redux-saga/effects';

import * as mutations from './mutations';
import uuid from 'uuid';

/* export function* taskCreationSaga() {
  while (true) {
    const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
    console.log("Got groupID? ", groupID);
  }
} */

export default function* taskCreationSaga(){
    while (true){
        const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID = 'U1';
        // const ownerID = yield select(state=>state.session.id);
        const taskID = uuid();
        yield put(mutations.createTask(taskID, groupID, ownerID));
        console.log("Got groupID? ", groupID);
    }
}
