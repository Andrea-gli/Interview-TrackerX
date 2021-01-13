import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../../routes/useAuth';
import StepsTableAddButton from './StepsTableAddButton';
import StepsTableHeader from './StepsTableHeader';
import StepsTableRows from './StepsTableRows';
import axios from 'axios';

const StepsTable = ({ app }) => {
  // react hooks
  const [stepData, setStepData] = useState([]);
  const [updateState, setUpdateState] = useState(true);
  const [showModalStep, setShowModalStep] = useState({
    action: null,
    id: null,
  }); // none / edit /add

  const history = useHistory();
  const auth = useAuth();

  // console.log('stepsData ===> ', stepData);

  // get the applications steps data from the DB
  useEffect(() => {
    if (updateState) fetchSteps();
  }, [updateState]);

  const fetchSteps = async () => {
    try {
      const res = await axios.get(
        `/user/${auth.user.id}/application/${app.id}/step`
      );
      // console.log('res.data ===>', res.data);
      setStepData(res.data);
      setUpdateState(false);
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in fetchSteps of StepsTable component:',
        error.response.data.err
      );
    }
  };

  //Delete step from the DB
  const removeStep = async (app_id, step_id) => {
    try {
      const res = await axios.delete(
        `/user/${auth.user.id}/application/${app_id}/step/${step_id}`
      );
      setUpdateState(true);
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in handleSubmit of StepsTable component:',
        error.response.data.err
      );
    }
  };

  return (
    <div className="tableContainer">
      <table id="stepsTracker">
        <StepsTableHeader />
        <StepsTableRows
          stepData={stepData}
          setShowModalStep={setShowModalStep}
          removeStep={removeStep}
        />
      </table>
      <StepsTableAddButton
        stepData={stepData}
        setUpdateState={setUpdateState}
        showModalStep={showModalStep}
        setShowModalStep={setShowModalStep}
        app={app}
      />
    </div>
  );
};

export default StepsTable;
