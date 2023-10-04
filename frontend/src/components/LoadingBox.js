import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
  return (
    <Spinner annimation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>

  )
}
