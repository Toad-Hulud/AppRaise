import React from 'react';
import { Box, Typography } from '@mui/material';
import { User } from '../../types';
import { UserCard } from '../UserCard';
import { useOrgChart } from './useOrgChart';
import styles from '../../styles/OrgChart.module.css';

interface OrgChartProps {
  users: User[];
}

export const OrgChart: React.FC<OrgChartProps> = ({ users }) => {
  const {
    selectedUserForManagerChange,
    hoveredUserId,
    handleSelectNewManager,
    setHoveredUserId,
  } = useOrgChart();

  const renderSubordinates = (
    userId: string,
    currentManagerId: string | null,
  ) => {
    const subordinates = users.filter(
      (user) => user.manager && user.manager.id === userId,
    );
    if (!subordinates.length) return null;
    return (
      <ul>
        {subordinates.map((sub) => (
          <li
            key={sub.id}
            className={`
              ${sub.id === currentManagerId ? styles.highlighted : ''} 
              ${selectedUserForManagerChange ? styles.changeCursor : ''} 
              ${hoveredUserId === sub.id ? styles.hovered : ''}
            `}
            onMouseEnter={() =>
              selectedUserForManagerChange && setHoveredUserId(sub.id)
            }
            onMouseLeave={() =>
              selectedUserForManagerChange && setHoveredUserId(null)
            }
            onClick={(e) => {
              e.stopPropagation();
              selectedUserForManagerChange && handleSelectNewManager(sub.id);
            }}
          >
            <UserCard
              user={sub}
              onHover={setHoveredUserId}
              isHovered={hoveredUserId === sub.id}
            />
            {renderSubordinates(sub.id, currentManagerId)}
          </li>
        ))}
      </ul>
    );
  };

  const renderUsers = () => {
    if (!users) {
      return <Typography>No users found</Typography>;
    }
    return users
      .filter((user) => !user.manager)
      .map((user) => (
        <li
          key={user.id}
          className={`
            ${user.id === selectedUserForManagerChange?.manager?.id ? styles.highlighted : ''} 
            ${selectedUserForManagerChange ? styles.changeCursor : ''}
            ${hoveredUserId === user.id ? styles.hovered : ''}
          `}
          onMouseEnter={() =>
            selectedUserForManagerChange && setHoveredUserId(user.id)
          }
          onMouseLeave={() =>
            selectedUserForManagerChange && setHoveredUserId(null)
          }
          onClick={(e) => {
            e.stopPropagation();
            selectedUserForManagerChange && handleSelectNewManager(user.id);
          }}
        >
          <UserCard
            user={user}
            onHover={setHoveredUserId}
            isHovered={hoveredUserId === user.id}
          />
          {renderSubordinates(
            user.id,
            selectedUserForManagerChange?.manager?.id || null,
          )}
        </li>
      ));
  };

  return (
    <Box className={styles.orgChart}>
      <ul className={styles.orgChart}>{renderUsers()}</ul>
    </Box>
  );
};
