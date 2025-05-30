"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { AdminNavbar } from "../components/AdminNavbar"
import { Edit, Package, Plus, Search, Trash, X } from "lucide-react"
import API_BASE_URL from "../config.jsx";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #eeeeee;
  padding-top: 130px;
  overflow: hidden;
`

const Section = styled.div`
  padding: 40px 80px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`

const PageTitle = styled.h1`
  color: #665A38;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #665A38;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #554b2f;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`

const SearchBar = styled.div`
  position: relative;
  max-width: 400px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 42px;
  border-radius: 8px;
  border: 1px solid #e0dfd6;
  background: #fff;
  color: #665A38;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #8B8055;
  }

  &::placeholder {
    color: #a9a28c;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #8B8055;
`

const ProductsTable = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(102, 90, 56, 0.1);
  overflow: hidden;
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 2fr 1fr 1fr 100px;
  padding: 16px 24px;
  background: #f0efe6;
  border-bottom: 1px solid #e0dfd6;
  color: #665A38;
  font-weight: 600;
  font-size: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 80px 2fr 1fr 1fr 100px;
  padding: 16px 24px;
  border-bottom: 1px solid #f0efe6;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: block;
    position: relative;
    padding: 16px;
  }
`

const TableCell = styled.div`
  color: #665A38;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 4px 0;
    display: flex;

    &:before {
      content: "${(props) => props.label}";
      width: 100px;
      font-weight: 600;
      margin-right: 16px;
    }
  }
`

const ProductImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: #f0efe6;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-right: 16px;
  }
`

const ProductName = styled(TableCell)`
  font-weight: 500;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &:before {
      display: none;
    }
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`

const ActionButton = styled.button`
  background: ${(props) => (props.danger ? "#FFEBEE" : "#f0efe6")};
  color: ${(props) => (props.danger ? "#E53935" : "#665A38")};
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.danger ? "#ffcdd2" : "#e5e4db")};
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0efe6;
`

const ModalTitle = styled.h2`
  color: #665A38;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #8B8055;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #f0efe6;
    color: #665A38;
  }
`

const ModalBody = styled.div`
  padding: 20px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #665A38;
  font-weight: 500;
`

const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e0dfd6;
  background: #fff;
  color: #665A38;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #8B8055;
    box-shadow: 0 0 0 2px rgba(139, 128, 85, 0.2);
  }
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border:ņš

  border: 1px solid #e0dfd6;
  background: #fff;
  color: #665A38;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #8B8055;
    box-shadow: 0 0 0 2px rgba(139, 128, 85, 0.2);
  }
`

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e0dfd6;
  background: #fff;
  color: #665A38;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #8B8055;
    box-shadow: 0 0 0 2px rgba(139, 128, 85, 0.2);
  }
`

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  border: 1px dashed #e0dfd6;
  background: #f9f8f3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${(props) => (props.primary ? "#665A38" : props.danger ? "#E53935" : "#fff")};
  color: ${(props) => (props.primary || props.danger ? "#fff" : "#665A38")};
  border: 1px solid ${(props) => (props.primary ? "#665A38" : props.danger ? "#E53935" : "#e0dfd6")};

  &:hover {
    background: ${(props) => (props.primary ? "#554b2f" : props.danger ? "#c62828" : "#f9f8f3")};
  }
`

const ConfirmationModal = styled(ModalContent)`
  max-width: 400px;
`

const ConfirmationText = styled.p`
  color: #665A38;
  margin-bottom: 20px;
`

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const cakeResponse = await fetch(`${API_BASE_URL}/cake/all`, {
          headers: { "Content-Type": "application/json" },
        })
        const cakes = await cakeResponse.json()

        const cupcakeResponse = await fetch(`${API_BASE_URL}/cupcake/all`, {
          headers: { "Content-Type": "application/json" },
        })
        const cupcakes = await cupcakeResponse.json()

        const otherResponse = await fetch(`${API_BASE_URL}/other/all`, {
          headers: { "Content-Type": "application/json" },
        })
        const otherProducts = await otherResponse.json()

        const normalizedProducts = [
          ...cakes.map((cake) => ({
            id: cake.productId,
            name: cake.productName,
            category: cake.productType?.productTypeName || "Cakes",
            price: cake.productPrice || `Rs. ${parseFloat(2500).toFixed(2)}`,
            stock: 0, // Stock not in DB, default to 0
            description: cake.productDescription || "",
            image: cake.productImage || cake.productType?.imageUrl || "/placeholder.svg",
          })),
          ...cupcakes.map((cupcake) => ({
            id: cupcake.productId,
            name: `${cupcake.productName} (${cupcake.productFlavour})`,
            category: cupcake.productType?.productTypeName || "Cupcakes",
            price: `Rs. ${parseFloat(cupcake.productPrice).toFixed(2)}`,
            stock: 0, // Stock not in DB, default to 0
            description: `A ${cupcake.productFlavour.toLowerCase()} flavored cupcake`,
            image: cupcake.productImage || cupcake.productType?.imageUrl || "/placeholder.svg",
          })),
          ...otherProducts.map((product) => ({
            id: product.productId,
            name: product.productName,
            category: product.productType?.productTypeName || "Other",
            price: `Rs. ${parseFloat(product.productUnitPrice).toFixed(2)}`,
            stock: 0, // Stock not in DB, default to 0
            description: `A delicious ${product.productName.toLowerCase()}`,
            image: product.productImage || product.productType?.imageUrl || "/placeholder.svg",
          })),
        ]

        setProducts(normalizedProducts)
        setLoading(false)
      } catch (err) {
        setError("Failed to load products. Please try again.")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(
      (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditClick = (product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.replace("Rs. ", ""),
      stock: product.stock.toString(),
      description: product.description,
      image: product.image,
    })
    setIsAddModalOpen(true)
  }

  const handleDeleteClick = (product) => {
    setProductToDelete(product)
    setIsDeleteModalOpen(true)
  }

  const handleAddNewClick = () => {
    setSelectedProduct(null)
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: "/placeholder.svg",
    })
    setIsAddModalOpen(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    console.log("Saving product:", formData)
    setSelectedProduct(null)
    setIsAddModalOpen(false)
  }

  const handleDelete = () => {
    console.log("Deleting product:", productToDelete)
    setProductToDelete(null)
    setIsDeleteModalOpen(false)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setIsAddModalOpen(false)
  }

  const closeDeleteModal = () => {
    setProductToDelete(null)
    setIsDeleteModalOpen(false)
  }

  return (
      <PageContainer>
        <AdminNavbar activeTab="products" />
        <Section>
          <PageHeader>
            <PageTitle>
              <Package size={24} /> Products
            </PageTitle>
            <AddButton onClick={handleAddNewClick}>
              <Plus size={18} /> Add New Product
            </AddButton>
          </PageHeader>

          <SearchBar>
            <SearchIcon>
              <Search size={18} />
            </SearchIcon>
            <SearchInput
                placeholder="Search products by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>

          <ProductsTable>
            <TableHeader>
              <div>Image</div>
              <div>Product</div>
              <div>Category</div>
              <div>Price</div>
              <div>Actions</div>
            </TableHeader>

            {loading ? (
                <TableRow>
                  <TableCell style={{ gridColumn: "1 / -1", textAlign: "center" }}>Loading products...</TableCell>
                </TableRow>
            ) : error ? (
                <TableRow>
                  <TableCell style={{ gridColumn: "1 / -1", textAlign: "center" }}>{error}</TableCell>
                </TableRow>
            ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <ProductImage>
                          <img src={product.image || "/placeholder.svg"} alt={product.name} />
                        </ProductImage>
                      </TableCell>
                      <ProductName label="Product">
                        <ProductImage style={{ display: "none" }}>
                          <img src={product.image || "/placeholder.svg"} alt={product.name} />
                        </ProductImage>
                        {product.name}
                      </ProductName>
                      <TableCell label="Category">{product.category}</TableCell>
                      <TableCell label="Price">{product.price}</TableCell>
                      <TableCell>
                        <ActionButtons>
                          <ActionButton onClick={() => handleEditClick(product)}>
                            <Edit size={16} />
                          </ActionButton>
                          <ActionButton danger onClick={() => handleDeleteClick(product)}>
                            <Trash size={16} />
                          </ActionButton>
                        </ActionButtons>
                      </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                  <TableCell style={{ gridColumn: "1 / -1", textAlign: "center" }}>No products found</TableCell>
                </TableRow>
            )}
          </ProductsTable>
        </Section>

        {(selectedProduct || isAddModalOpen) && (
            <ModalOverlay onClick={closeModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>
                    <Package size={20} /> {selectedProduct ? "Edit Product" : "Add New Product"}
                  </ModalTitle>
                  <CloseButton onClick={closeModal}>
                    <X size={20} />
                  </CloseButton>
                </ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <FormLabel>Product Image</FormLabel>
                    <ImagePreview>
                      <img src={formData.image || "/placeholder.svg"} alt="Product preview" />
                    </ImagePreview>
                    <FormInput
                        type="text"
                        placeholder="Image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Product Name</FormLabel>
                    <FormInput
                        type="text"
                        placeholder="Enter product name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Category</FormLabel>
                    <FormSelect name="category" value={formData.category} onChange={handleInputChange}>
                      <option value="">Select category</option>
                      <option value="Cakes">Cakes</option>
                      <option value="Cupcakes">Cupcakes</option>
                      <option value="Brownies">Brownies</option>
                      <option value="Cookies">Cookies</option>
                      <option value="Muffins">Muffins</option>
                    </FormSelect>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Price (Rs.)</FormLabel>
                    <FormInput
                        type="text"
                        placeholder="Enter price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormInput
                        type="number"
                        placeholder="Enter stock quantity"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <FormTextarea
                        placeholder="Enter product description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                  </FormGroup>

                  <ButtonGroup>
                    <Button primary onClick={handleSubmit}>
                      {selectedProduct ? "Update Product" : "Add Product"}
                    </Button>
                    <Button onClick={closeModal}>Cancel</Button>
                  </ButtonGroup>
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
        )}

        {isDeleteModalOpen && productToDelete && (
            <ModalOverlay onClick={closeDeleteModal}>
              <ConfirmationModal onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>
                    <Trash size={20} /> Delete Product
                  </ModalTitle>
                  <CloseButton onClick={closeDeleteModal}>
                    <X size={20} />
                  </CloseButton>
                </ModalHeader>
                <ModalBody>
                  <ConfirmationText>
                    Are you sure you want to delete "{productToDelete.name}"? This action cannot be undone.
                  </ConfirmationText>
                  <ButtonGroup>
                    <Button danger onClick={handleDelete}>
                      Delete
                    </Button>
                    <Button onClick={closeDeleteModal}>Cancel</Button>
                  </ButtonGroup>
                </ModalBody>
              </ConfirmationModal>
            </ModalOverlay>
        )}
      </PageContainer>
  )
}

export default AdminProducts