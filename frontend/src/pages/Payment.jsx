import axios from 'axios';
import { CloudUpload } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import API_BASE_URL from "../config.jsx";

// Styled Components (keeping all existing styles, only adding what's needed)
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
`;

const PageTitle = styled.h1`
  font-family: 'Inter', serif;
  font-size: 60px;
  font-weight: 200;
  color: #665A38;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #000;
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #665A38;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #665A38;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #7d6c43;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1rem;

  &:last-of-type {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const PriceLabel = styled.span`
  color: #555;
`;

const PriceValue = styled.span`
  font-weight: 500;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #665A38;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1.5rem;

  &:hover {
    background-color: #7d6c43;
  }

  &:disabled {
    background-color: #7d6c43;
    cursor: not-allowed;
  }
`;

const PaymentOptions = styled.div`
  margin: 1.5rem 0;
`;

const PaymentOption = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  ${props => props.selected && `
    border-color: #665A38;
    background-color: rgba(59, 130, 246, 0.05);
  `}

  &:hover {
    border-color: #7d6c43;
  }
`;

const RadioCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? '#7d6c43' : '#ddd'};
  margin-right: 1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.selected ? '#7d6c43' : 'transparent'};
  }
`;

const PaymentLabel = styled.div`
  font-weight: 500;
`;

const UploadArea = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;
  border: 2px dashed #ddd;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #665A38;
    background-color: rgba(59, 130, 246, 0.05);
  }
`;

const UploadIcon = styled.div`
  margin-bottom: 0.5rem;
  color: #64748b;
`;

const UploadText = styled.div`
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const FileName = styled.div`
  font-size: 0.875rem;
  color: #3b82f6;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

const ItemVariant = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const ItemPrice = styled.div`
  font-weight: 500;
  color: #665A38;
`;



const Payment = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    postalcode: ''
  });

  const [receipt, setReceipt] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery'); // New state for payment method
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  const { cart = [], total = '0.00' } = location.state || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf') {
        if (file.size <= 5 * 1024 * 1024) { // 5MB limit
          setReceipt(file);
          setErrors({ ...errors, receipt: '' });
        } else {
          setErrors({ ...errors, receipt: 'File size should be less than 5MB' });
        }
      } else {
        setErrors({ ...errors, receipt: 'Please upload a JPG, PNG, or PDF file' });
      }
    } else {
      setReceipt(null);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === 'Cash on Delivery') {
      setReceipt(null); // Clear receipt when switching to COD
      setErrors({ ...errors, receipt: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};

    // Basic validation
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile validation
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    // Receipt validation for Receipt Upload
    if (paymentMethod === 'Receipt Upload' && !receipt) {
      newErrors.receipt = 'Please upload a payment receipt';
    }

    setErrors(newErrors);

    // If no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      try {
        // Prepare order data
        const deliveryFee = 250;
        const tax = 100;
        const orderTotal = (parseFloat(total) + deliveryFee + tax).toFixed(2);

        // Create product description from cart
        const productDescription = cart.map(item => {
          const variant = getItemVariantLabel(item);
          return `${item.name} (${variant}) x ${item.quantity} - Rs. ${(item.price * item.quantity).toFixed(2)}`;
        }).join('; ');

        const orderData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.mobile,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalcode,
          productDescription,
          totalPrice: orderTotal,
          orderDate: new Date().toISOString(),
          paymentMethod, // Use selected payment method
          orderStatus: 'Pending',
          paymentStatus: 'Pending'
        };

        // Create FormData for multipart request
        const formDataToSend = new FormData();
        formDataToSend.append('order', JSON.stringify(orderData));
        if (receipt && paymentMethod === 'Receipt Upload') {
          formDataToSend.append('file', receipt);
        }

        // Send request to backend
        const response = await axios.post(`${API_BASE_URL}/order/save`, formDataToSend, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("site")}`
          }
        });
        const orderId = response.data.orderId;
        localStorage.setItem("orderId", orderId);


        console.log('Order saved:', response.data);
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        navigate("/paymentconfirmation")
      } catch (error) {
        console.error('Error saving order:', error);
        setErrors({
          ...errors,
          submit: error.response?.data || 'Failed to place order. Please try again.'
        });
      }
    }
  };

  // Calculate order details
  const deliveryFee = 250;
  const tax = 100;
  const orderDetails = {
    subtotal: parseFloat(total),
    deliveryFee,
    tax,
    total: (parseFloat(total) + deliveryFee + tax).toFixed(2)
  };

  // Function to infer item variant label
  const getItemVariantLabel = (item) => {
    if (item.flavor) return `Flavor: ${item.flavor}`;
    if (item.size) return `Size: ${item.size}`;
    const name = item.name.toLowerCase();
    if (name.includes('brownie')) return 'Type: Brownie';
    if (name.includes('cookie')) return 'Type: Cookie';
    if (name.includes('muffin')) return 'Type: Muffin';
    return 'Type: Item';
  };

  return (
      <Container>
        <PageTitle>Checkout</PageTitle>
        <form onSubmit={handleSubmit}>
          <CheckoutGrid>
            <Section>
              <SectionTitle>Fill Address</SectionTitle>
              <FormGrid>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                  />
                  {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                  />
                  {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
                </FormGroup>
              </FormGrid>

              <FormGrid>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                  />
                  {errors.mobile && <ErrorMessage>{errors.mobile}</ErrorMessage>}
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                />
                {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
              </FormGroup>

              <FormGrid>
                <FormGroup>
                  <Label htmlFor="city">City</Label>
                  <Input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                  />
                  {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="state">State</Label>
                  <Input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                  />
                  {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <Label htmlFor="postalcode">Postal Code</Label>
                <Input
                    type="text"
                    id="postalcode"
                    name="postalcode"
                    value={formData.postalcode}
                    onChange={handleInputChange}
                />
                {errors.postalcode && <ErrorMessage>{errors.postalcode}</ErrorMessage>}
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>Order Summary</SectionTitle>
              {cart.length === 0 ? (
                  <div>No items in cart.</div>
              ) : (
                  <>
                    {cart.map((item, index) => (
                        <CartItem key={`${item.id}-${item.flavor || item.size || item.name}-${index}`}>
                          <ItemImage src={item.image || '/placeholder.svg'} alt={item.name} />
                          <ItemDetails>
                            <ItemName>{item.name || 'Unknown Product'}</ItemName>
                            <ItemVariant>{getItemVariantLabel(item)}</ItemVariant>
                            <ItemPrice>Rs. {(item.price || 0).toFixed(2)} x {item.quantity}</ItemPrice>
                          </ItemDetails>
                        </CartItem>
                    ))}
                  </>
              )}
              <div>
                <PriceRow>
                  <PriceLabel>Subtotal</PriceLabel>
                  <PriceValue>Rs. {orderDetails.subtotal.toLocaleString()}</PriceValue>
                </PriceRow>

                <PriceRow>
                  <PriceLabel>Delivery Fee</PriceLabel>
                  <PriceValue>Rs. {orderDetails.deliveryFee.toLocaleString()}</PriceValue>
                </PriceRow>

                <PriceRow>
                  <PriceLabel>Tax</PriceLabel>
                  <PriceValue>Rs. {orderDetails.tax.toLocaleString()}</PriceValue>
                </PriceRow>

                <PriceRow>
                  <PriceLabel>Total Price</PriceLabel>
                  <PriceValue>Rs. {orderDetails.total.toLocaleString()}</PriceValue>
                </PriceRow>
              </div>

              <SectionTitle>Payment Options</SectionTitle>
              <PaymentOptions>
                <PaymentOption
                    selected={paymentMethod === 'Cash on Delivery'}
                    onClick={() => handlePaymentMethodChange('Cash on Delivery')}
                >
                  <RadioCircle selected={paymentMethod === 'Cash on Delivery'} />
                  <PaymentLabel>Cash on Delivery</PaymentLabel>
                </PaymentOption>

                <PaymentOption
                    selected={paymentMethod === 'Receipt Upload'}
                    onClick={() => handlePaymentMethodChange('Receipt Upload')}
                >
                  <RadioCircle selected={paymentMethod === 'Receipt Upload'} />
                  <PaymentLabel>Receipt Upload</PaymentLabel>
                </PaymentOption>
              </PaymentOptions>

              {paymentMethod === 'Receipt Upload' && (
                  <div>
                    <Label>Upload Payment Receipt</Label>
                    <input
                        type="file"
                        id="receipt"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="receipt">
                      <UploadArea>
                        <UploadIcon>
                          <CloudUpload size={24} />
                        </UploadIcon>
                        <UploadText>Click to upload or drag and drop</UploadText>
                        <div>JPG, PNG, or PDF (max. 5MB)</div>
                        {receipt && <FileName>{receipt.name}</FileName>}
                      </UploadArea>
                    </label>
                    {errors.receipt && <ErrorMessage>{errors.receipt}</ErrorMessage>}
                  </div>
              )}

              <div style={{ marginTop: '10px' }}>
                Payment Method: {paymentMethod}
              </div>

              {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
              <Button type="submit">Place Order</Button>
            </Section>
          </CheckoutGrid>
        </form>
      </Container>
  );
};

export default Payment;