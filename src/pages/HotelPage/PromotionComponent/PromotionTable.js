import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Switch } from '@mui/material';
import { FiTrash2 } from 'react-icons/fi';

const PromotionTable = ({ promotions, setPromotions, setEditingPromotion, setOpenDialog }) => {

  const handleDeletePromotion = (id) => {
    const updatedPromotions = promotions.filter((p) => p.promotion_id !== id);
    setPromotions(updatedPromotions);
  };

  return (
    <TableContainer component={Paper} className="mt-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Service ID</TableCell>
            <TableCell>Offering ID</TableCell>
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
          {promotions.map((promotion) => (
            <TableRow key={promotion.promotion_id}>
              <TableCell>{promotion.promotion_id}</TableCell>
              <TableCell>{promotion.service_id}</TableCell>
              <TableCell>{promotion.offering_id || 'N/A'}</TableCell>
              <TableCell>{promotion.discount_percentage}%</TableCell>
              <TableCell>{promotion.start_date}</TableCell>
              <TableCell>{promotion.end_date}</TableCell>
              <TableCell>
                <Switch
                  checked={promotion.is_active}
                  onChange={() => {
                    const updatedPromotion = {
                      ...promotion,
                      is_active: !promotion.is_active,
                    };
                    setPromotions(
                      promotions.map((p) =>
                        p.promotion_id === promotion.promotion_id
                          ? updatedPromotion
                          : p
                      )
                    );
                  }}
                />
              </TableCell>
              <TableCell>{promotion.usage_limit || 'Unlimited'}</TableCell>
              <TableCell>{promotion.promocode || 'Automatic'}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => { setEditingPromotion(promotion); setOpenDialog(true); }}
                >
                  Edit
                </Button>
                <IconButton
                  color="secondary"
                  onClick={() => handleDeletePromotion(promotion.promotion_id)}
                >
                  <FiTrash2 />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PromotionTable;
