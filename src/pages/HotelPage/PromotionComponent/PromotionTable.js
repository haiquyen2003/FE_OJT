import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Switch, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar, Pagination } from '@mui/material';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import axios from 'axios';

const PromotionTable = ({ promotions, setPromotions, setEditingPromotion, setOpenDialog }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingPromotionId, setDeletingPromotionId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const promotionsPerPage = 5;

  useEffect(() => {
    const fetchPromotions = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please login');
        return;
      }

      try {
        const response = await axios.get('https://localhost:7253/provider/promotions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setPromotions(response.data);
      } catch (error) {
        console.error('Failed to fetch promotions:', error);
      }
    };

    fetchPromotions();
  }, [setPromotions]);

  const handleDeleteClick = (id) => {
    setDeletingPromotionId(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeletePromotion = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
      return;
    }

    try {
      const response = await axios.delete(`https://localhost:7253/provider/promotions/${deletingPromotionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const updatedPromotions = promotions.filter((p) => p.promotionId !== deletingPromotionId);
      setPromotions(updatedPromotions);
      setDeleteConfirmOpen(false);
      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to delete promotion', error);
      setSnackbarMessage('Failed to delete promotion');
      setSnackbarOpen(true);
    }
  };

  const handleToggleActive = async (promotion) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
      return;
    }

    try {
      const updatedPromotion = { ...promotion, isActive: !promotion.isActive };
      const response = await axios.put(`https://localhost:7253/provider/promotions/${promotion.promotionId}/activate`, updatedPromotion, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Update the promotions state with the updated promotion
      setPromotions(promotions.map(p => p.promotionId === promotion.promotionId ? updatedPromotion : p));

      // Show success message in Snackbar
      setSnackbarMessage('Promotion status updated successfully!');
      setSnackbarOpen(true);

    } catch (error) {
      console.error('Failed to update promotion status', error);

      // Show error message in Snackbar
      setSnackbarMessage('Failed to update promotion status.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastPromotion = currentPage * promotionsPerPage;
  const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
  const currentPromotions = promotions.slice(indexOfFirstPromotion, indexOfLastPromotion);

  return (
    <>
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Offering Promotion</TableCell>
              <TableCell>Discount %</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Usage Limit</TableCell>
              <TableCell>Promo Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPromotions.map((promotion) => (
              <TableRow key={promotion.promotionId}>
                <TableCell>{promotion.promotionId}</TableCell>
                <TableCell>{promotion.serviceOffering?.name || 'Applicable to all services'}</TableCell>
                <TableCell>{promotion.discountPercentage}%</TableCell>
                <TableCell>{new Date(promotion.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(promotion.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Switch
                    checked={promotion.isActive}
                    onChange={() => handleToggleActive(promotion)}
                  />
                </TableCell>
                <TableCell>{promotion.usageLimit || 'Unlimited'}</TableCell>
                <TableCell>{promotion.promocode || 'Automatic'}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditingPromotion(promotion);  // Truyền đúng khuyến mãi đang chỉnh sửa vào state
                      setOpenDialog(true);  // Mở dialog chỉnh sửa
                    }}
                  >
                    <FiEdit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteClick(promotion.promotionId)}
                  >
                    <FiTrash2 />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil(promotions.length / promotionsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          className="mt-4"
        />
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this promotion? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePromotion} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        ContentProps={{
          style: { backgroundColor: '#4caf50' },
        }}
      />
    </>
  );
};

export default PromotionTable;
