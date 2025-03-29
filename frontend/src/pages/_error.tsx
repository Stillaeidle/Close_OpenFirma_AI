import React from 'react';
import { NextPageContext } from "next";

function Error({ statusCode }: { statusCode: number }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">{statusCode}</h1>
        <p className="text-xl mt-4">
          {statusCode
            ? `An error occurred on server`
            : "An error occurred on client"}
        </p>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;