import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../lib/contextLib';
import * as React from 'react';

interface AuthenticatedRouteProps {
  children: React.ReactNode;
}

export default function AuthenticatedRoute(props: AuthenticatedRouteProps) {
  const { children } = props;
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${pathname}${search}`} />;
  }

  return children;
}
