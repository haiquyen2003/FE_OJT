import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Edit, Delete, PhotoLibrary, ListAlt, Visibility } from '@mui/icons-material';

const RoomTypeList = ({ offerings, onEdit, onDelete, onViewImages, onViewOfferingDetails }) => {
  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'availableUnits', headerName: 'Available Units', width: 100 },
    { field: 'roomSize', headerName: 'Room Size (m2)', width: 100 },
    { field: 'maxGuests', headerName: 'Max Guests', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => onEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(params.row.id)}>
            <Delete />
          </IconButton>
          <IconButton color="primary" onClick={() => onViewImages(params.row)}>
            <PhotoLibrary />
          </IconButton>
          <IconButton color="primary" onClick={() => onViewOfferingDetails(params.row)}>
            <Visibility />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={offerings}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default RoomTypeList;
