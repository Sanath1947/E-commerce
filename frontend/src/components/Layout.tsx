import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as CartIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleCart } from '../store/slices/cartSlice';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate('/')}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            3D E-Commerce
          </Typography>

          <IconButton color="inherit" onClick={() => dispatch(toggleCart())}>
            <Badge badgeContent={totalItems} color="secondary">
              <CartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={cart.isOpen}
        onClose={() => dispatch(toggleCart())}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Shopping Cart</Typography>
            <IconButton onClick={() => dispatch(toggleCart())}>
              <CloseIcon />
            </IconButton>
          </Box>

          {cart.items.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
              Your cart is empty
            </Typography>
          ) : (
            <>
              <List>
                {cart.items.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={item.name}
                      secondary={`Quantity: ${item.quantity}`}
                    />
                    <ListItemSecondaryAction>
                      <Typography variant="body2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 2, p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Total: ${cart.total.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    dispatch(toggleCart());
                    navigate('/checkout');
                  }}
                >
                  Checkout
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 