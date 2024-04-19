import React from 'react'
import { useLocation } from 'react-router'
export default function OrderDetails() {

    const location = useLocation();
    console.log("locatiojn", location?.state)
    const details = location?.state?.details
    const role = location?.state?.role
  return (
    <div>OrderDetails</div>
  )
}
