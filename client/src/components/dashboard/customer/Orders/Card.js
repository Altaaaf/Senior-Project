import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import './OrdersCss.css';
import OrderDetailPage from './OrderModle';
import FastfoodTwoToneIcon from '@material-ui/icons/FastfoodTwoTone';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 360,
		boxShadow: '2px 2px 2px 2px #888888',
		margin: '20px',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		border: '3px solid lightseagreen',
		backgroundColor: 'white',
	},
	registerButton: {
		width: '100%',
	},
	catalogIcon: {
		color: '#b38917',
		cursor: 'pointer',
	},
}));

export default function RecipeReviewCard(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleChangeView = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	var totalPrice = 0;
	var tax = 0;
	var subTotal = 0;

	const calculateSubtotal = () => {
		props.orders.forEach((item) => {
			totalPrice += item.Quantity * item.Price;
		});
		return totalPrice;
	};

	const calculateTax = () => {
		props.orders.forEach((item) => {
			totalPrice += item.Quantity * item.Price;
		});
		tax = (totalPrice * 0.0875).toFixed(2);
		return tax;
	};

	return (
		<>
			<OrderDetailPage
				orders={props.orders}
				open={open}
				handleClose={() => handleClose()}
				id={props.id}
			/>
			{
				<Card className={classes.root}>
					<CardHeader
						avatar={
							<Avatar aria-label='recipe' src={props.logo} className={classes.avatar}>
								<ShoppingBasketIcon className={classes.catalogIcon} />
							</Avatar>
						}
						action={
							<IconButton aria-label='settings'>
								<MoreVertIcon />
							</IconButton>
						}
						title={`Order id : ${props.id}`}
						subheader={`Date : ${
							props.createdDate
								? props.createdDate
								: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
						}`}
					/>
					<CardContent>
						<Typography variant='body2' color='textSecondary' component='p'>
							<div className='card_items'>
								<FastfoodTwoToneIcon style={{ color: '#b38917' }} />
								<b>Order Status</b>
								<p>{props.Status}</p>
							</div>
							<div className='card_items'>
								<FastfoodTwoToneIcon style={{ color: '#b38917' }} />
								<b>Total Items : </b>
								<p>{props.orders.length}</p>
							</div>
							<div className='card_items'>
								<AttachMoneyIcon color='primary' />
								<b>Tax : </b>
								<p>{calculateTax()}</p>
							</div>
							<div className='card_items'>
								<AttachMoneyIcon color='primary' />
								<b>Subtotal :</b>
								<p>{totalPrice}</p>
							</div>
							<div className='card_items_subtotal'>
								<b>Total :</b>
								<p>$ {(totalPrice.toString() * 1.0875).toFixed(2)}</p>
							</div>
						</Typography>
					</CardContent>
					<Button
						onClick={() => handleChangeView()}
						className={classes.registerButton}
						variant='contained'
						color='lightgreen'>
						View Order Details
					</Button>
				</Card>
			}
		</>
	);
}
