import React, {useEffect} from 'react';
import './PaymentSuccess.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBalance, updateEarn, addProjectInSold } from '../../Service/api';

function PaymentSuccess() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const ORDERID=queryParams.get('orderId');
  const RESPMSG=queryParams.get('message');
  return (
    <>
      <h1>Hello , you're Payment Success</h1> 
      <p>{ORDERID}</p>
      <p>{RESPMSG}</p>
    </>
  );
}

export default PaymentSuccess;
