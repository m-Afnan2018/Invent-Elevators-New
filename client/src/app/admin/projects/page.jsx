'use client';

import { useState, useEffect } from 'react';
// import AdminLayout from '@/components/AdminLayout';
import {
    RiAddLine,
    RiSearchLine,
    RiEditLine,
    RiDeleteBinLine,
    RiCloseLine,
    RiGridFill,
    RiListCheck,
    RiFilterLine,
    RiUploadCloudLine,
    RiImageAddLine,
    RiBuildingLine,
    RiMapPinLine,
    RiCalendarLine,
    RiCheckboxCircleLine,
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import styles from './page.module.css';
import Image from 'next/image';
import { getProjects, createProject, updateProject, deleteProject } from '@/services/projects.service';
import { getProducts } from '@/services/products.service';
import { getCategories } from '@/services/categories.service';
import { uploadImage, uploadMultipleImages } from '@/services/upload.service';

const STATUS_OPTIONS = [
    { value: 'quote', label: 'Quote', color: '#94a3b8' },
    { value: 'active', label: 'Active', color: '#3b82f6' },
    { value: 'delivered', label: 'Delivered', color: '#f59e0b' },
    { value: 'completed', label: 'Completed', color: '#10b981' },
];

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('card');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingProject, setEditingProject] = useState(null);
    const [featuredImagePreview, setFeaturedImagePreview] = useState('');
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        client: '',
        location: '',
        completionDate: '',
        category: '',
        status: 'quote',
        featuredImage: '',
        galleryImages: [],
        isFeatured: false,
        showInFooter: false,
        cities: [],
        linkedProducts: [],
        customSpecs: {
            capacity: '',
            speed: '',
            floors: '',
            cabinSize: '',
            driveType: '',
            otherSpecs: '',
        },
        testimonials: [],
        // SEO / Metadata
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        ogImage: '',
    });

    const [currentTestimonial, setCurrentTestimonial] = useState({
        name: '',
        company: '',
        role: '',
        message: '',
        mediaType: 'image', // 'image' | 'video'
        image: '',
        video: '',
    });
    const [testimonialImgUploading, setTestimonialImgUploading] = useState(false);
    async function fetchProjects() {
        try {
            const data = await getProjects();
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    async function fetchProducts() {
        try {
            const data = await getProducts();
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async function fetchCategories() {
        try {
            const data = await getCategories();
            setCategories((data || []).map((category) => category.name));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchProjects();
            fetchProducts();
            fetchCategories();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    const handleSpecChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            customSpecs: {
                ...formData.customSpecs,
                [name]: value,
            },
        });
    };

    const handleProductSelect = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setFormData({ ...formData, linkedProducts: selected });
    };

    const handleFeaturedImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        const _tid = toast.loading('Uploading image…');
        try {
            const url = await uploadImage(file, 'projects');
            setFeaturedImagePreview(url);
            setFormData((prev) => ({ ...prev, featuredImage: url }));
            toast.success('Image uploaded!', { id: _tid });
        } catch (err) {
            toast.error(err?.message || 'Image upload failed.', { id: _tid });
        } finally {
            setIsUploading(false);
        }
    };

    const handleGalleryImagesChange = async (e) => {
        const _gid = toast.loading('Uploading images…');
        const files = Array.from(e.target.files);
        const remainingSlots = 20 - formData.galleryImages.length;

        if (files.length > remainingSlots) {
            alert(`You can only upload ${remainingSlots} more images (max 20 total)`);
            return;
        }

        setIsUploading(true);
        try {
            const urls = await uploadMultipleImages(files, 'projects');
            setFormData((prev) => ({
                ...prev,
                galleryImages: [...prev.galleryImages, ...urls],
            }));
            setGalleryPreviews((prev) => [...prev, ...urls]);
        } catch (err) {
            toast.error(err?.message || 'Gallery upload failed.', { id: _gid });
        } finally {
            toast.dismiss(_gid);
            setIsUploading(false);
        }
    };

    const removeGalleryImage = (index) => {
        const newGalleryImages = formData.galleryImages.filter((_, i) => i !== index);
        const newPreviews = galleryPreviews.filter((_, i) => i !== index);
        setFormData({ ...formData, galleryImages: newGalleryImages });
        setGalleryPreviews(newPreviews);
    };

    const handleTestimonialChange = (e) => {
        const { name, value } = e.target;
        setCurrentTestimonial({
            ...currentTestimonial,
            [name]: value,
        });
    };

    const addTestimonial = () => {
        if (!currentTestimonial.name || !currentTestimonial.message) {
            alert('Please fill in name and message for the testimonial');
            return;
        }

        setFormData({
            ...formData,
            testimonials: [...formData.testimonials, { ...currentTestimonial }],
        });

        setCurrentTestimonial({
            name: '',
            company: '',
            role: '',
            message: '',
        });
    };

    const removeTestimonial = (index) => {
        const newTestimonials = formData.testimonials.filter((_, i) => i !== index);
        setFormData({ ...formData, testimonials: newTestimonials });
    };

    const handleTestimonialImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setTestimonialImgUploading(true);
        const _tid = toast.loading('Uploading image…');
        try {
            const url = await uploadImage(file, 'projects');
            setCurrentTestimonial(prev => ({ ...prev, image: url }));
            toast.success('Image uploaded!', { id: _tid });
        } catch (err) {
            toast.error(err?.message || 'Upload failed.', { id: _tid });
        } finally {
            setTestimonialImgUploading(false);
        }
    };

    const handleAddCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            setCategories([...categories, newCategory.trim()]);
            setFormData({ ...formData, category: newCategory.trim() });
            setNewCategory('');
        }
    };

    const openModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                slug: project.slug || '',
                description: project.description,
                client: project.client,
                location: project.location,
                completionDate: project.completionDate,
                category: project.category,
                status: project.status || 'quote',
                featuredImage: project.featuredImage,
                galleryImages: project.galleryImages || [],
                isFeatured: project.isFeatured || false,
                showInFooter: project.showInFooter || false,
                cities: project.cities || [],
                linkedProducts: project.linkedProducts || [],
                customSpecs: project.customSpecs || {
                    capacity: '',
                    speed: '',
                    floors: '',
                    cabinSize: '',
                    driveType: '',
                    otherSpecs: '',
                },
                testimonials: project.testimonials || [],
                metaTitle: project.metaTitle || '',
                metaDescription: project.metaDescription || '',
                metaKeywords: Array.isArray(project.metaKeywords) ? project.metaKeywords.join(', ') : (project.metaKeywords || ''),
                ogImage: project.ogImage || '',
            });
            setFeaturedImagePreview(project.featuredImage);
            setGalleryPreviews(project.galleryImages || []);
            // Ensure the saved category appears as an option even if not in the fetched list
            if (project.category && !categories.includes(project.category)) {
                setCategories(prev => [...prev, project.category]);
            }
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                slug: '',
                description: '',
                client: '',
                location: '',
                completionDate: '',
                category: '',
                status: 'quote',
                featuredImage: '',
                galleryImages: [],
                isFeatured: false,
        showInFooter: false,
                linkedProducts: [],
                customSpecs: {
                    capacity: '',
                    speed: '',
                    floors: '',
                    cabinSize: '',
                    driveType: '',
                    otherSpecs: '',
                },
                testimonials: [],
                metaTitle: '',
                metaDescription: '',
                metaKeywords: '',
                ogImage: '',
            });
            setFeaturedImagePreview('');
            setGalleryPreviews([]);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
        setCurrentTestimonial({
            name: '',
            company: '',
            role: '',
            message: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingProject) {
                await updateProject(editingProject._id, formData);
            } else {
                await createProject(formData);
            }
            await fetchProjects();
            closeModal();
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleDelete = async (projectId) => {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(projectId);
                await fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    const getProductNames = (productIds) => {
        return productIds
            .map((id) => products.find((p) => p._id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section>
            <div className={styles.projectsPage}>
                {/* Header */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>Projects</h1>
                        <p className={styles.pageSubtitle}>Showcase your completed projects</p>
                    </div>
                    <button className={styles.addButton} onClick={() => openModal()}>
                        <RiAddLine /> Add Project
                    </button>
                </div>

                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <div className={styles.searchWrapper}>
                        <RiSearchLine className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className={styles.toolbarActions}>
                        <button className={styles.filterButton}>
                            <RiFilterLine /> Filter
                        </button>
                        <div className={styles.viewToggle}>
                            <button
                                className={`${styles.viewButton} ${viewMode === 'table' ? styles.active : ''}`}
                                onClick={() => setViewMode('table')}
                            >
                                <RiListCheck />
                            </button>
                            <button
                                className={`${styles.viewButton} ${viewMode === 'card' ? styles.active : ''}`}
                                onClick={() => setViewMode('card')}
                            >
                                <RiGridFill />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {viewMode === 'table' ? (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Location</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((project) => (
                                    <tr key={project._id}>
                                        <td>
                                            <div className={styles.projectCell}>
                                                {project.featuredImage ? (
                                                    <img
                                                        src={project.featuredImage}
                                                        alt={project.title}
                                                        className={styles.projectThumbnail}
                                                    />
                                                ) : (
                                                    <div className={styles.projectThumbnailPlaceholder} />
                                                )}
                                                <div>
                                                    <div className={styles.projectTitle}>{project.title}</div>
                                                    {project.isFeatured && (
                                                        <span className={styles.featuredBadge}>Featured</span>
                                                    )}
                                                    {project.showInFooter && (
                                                        <span className={styles.footerBadge}>Footer</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{project.client}</td>
                                        <td>{project.location}</td>
                                        <td>
                                            <span className={styles.categoryBadge}>{project.category}</span>
                                        </td>
                                        <td>
                                            <span
                                                className={styles.statusBadge}
                                                style={{
                                                    background: `${STATUS_OPTIONS.find((s) => s.value === project.status)?.color
                                                        }15`,
                                                    color: STATUS_OPTIONS.find((s) => s.value === project.status)?.color,
                                                }}
                                            >
                                                {project.status}
                                            </span>
                                        </td>
                                        <td>{project.completionDate}</td>
                                        <td>
                                            <div className={styles.actionButtons}>
                                                <button
                                                    className={styles.editButton}
                                                    onClick={() => openModal(project)}
                                                >
                                                    <RiEditLine />
                                                </button>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDelete(project._id)}
                                                >
                                                    <RiDeleteBinLine />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={styles.cardGrid}>
                        {filteredProjects.map((project) => (
                            <div key={project._id} className={styles.card}>
                                <div className={styles.cardImageWrapper}>
                                    {project.featuredImage ? (
                                        <img
                                            src={project.featuredImage}
                                            alt={project.title}
                                            className={styles.cardImage}
                                        />
                                    ) : (
                                        <div className={styles.cardImagePlaceholder} />
                                    )}
                                    {project.isFeatured && (
                                        <span className={styles.featuredLabel}>Featured</span>
                                    )}
                                    <span
                                        className={styles.statusLabel}
                                        style={{
                                            background: STATUS_OPTIONS.find((s) => s.value === project.status)?.color,
                                        }}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{project.title}</h3>
                                    <p className={styles.cardDescription}>{project.description}</p>
                                    <div className={styles.cardMeta}>
                                        <div className={styles.metaItem}>
                                            <RiBuildingLine />
                                            <span>{project.client}</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <RiMapPinLine />
                                            <span>{project.location}</span>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <RiCalendarLine />
                                            <span>{project.completionDate}</span>
                                        </div>
                                    </div>
                                    <div className={styles.cardFooter}>
                                        <span className={styles.categoryTag}>{project.category}</span>
                                        <span className={styles.galleryCount}>
                                            <RiImageAddLine /> {(project.galleryImages || []).length} photos
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.cardActions}>
                                    <button className={styles.editButton} onClick={() => openModal(project)}>
                                        <RiEditLine /> Edit
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(project._id)}
                                    >
                                        <RiDeleteBinLine /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                                <button className={styles.closeButton} onClick={closeModal}>
                                    <RiCloseLine />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className={styles.modalForm}>
                                {/* Basic Information */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Basic Information</h3>
                                    <div className={styles.formGroup}>
                                        <label>Project Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Sky Tower Residential Complex"
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Description *</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Brief project description"
                                            rows="4"
                                            required
                                        />
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Client Name *</label>
                                            <input
                                                type="text"
                                                name="client"
                                                value={formData.client}
                                                onChange={handleInputChange}
                                                placeholder="Client company name"
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Location *</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                placeholder="City, State"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Category *</label>
                                            <div className={styles.categoryInput}>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select Category</option>
                                                    {categories.map((cat, index) => (
                                                        <option key={index} value={cat}>
                                                            {cat}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className={styles.categoryAddGroup}>
                                                <input
                                                    type="text"
                                                    value={newCategory}
                                                    onChange={(e) => setNewCategory(e.target.value)}
                                                    placeholder="Or add new"
                                                    className={styles.newCategoryInput}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddCategory}
                                                    className={styles.addCategoryBtn}
                                                >
                                                    <RiAddLine />
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Status *</label>
                                            <select name="status" value={formData.status} onChange={handleInputChange}>
                                                {STATUS_OPTIONS.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Completion Date</label>
                                            <input
                                                type="date"
                                                name="completionDate"
                                                value={formData.completionDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    name="isFeatured"
                                                    checked={formData.isFeatured}
                                                    onChange={handleInputChange}
                                                />
                                                <span>Featured Project</span>
                                            </label>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    name="showInFooter"
                                                    checked={formData.showInFooter}
                                                    onChange={handleInputChange}
                                                />
                                                <span>Show in Footer</span>
                                            </label>
                                            <small className={styles.helpText}>This project will appear in the "Last Projects" section of the footer.</small>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Area We Serve</label>
                                            <div className={styles.citiesRow}>
                                                {[
                                                    { value: 'dubai',     label: 'Dubai' },
                                                    { value: 'sharjah',   label: 'Sharjah' },
                                                    { value: 'abu-dhabi', label: 'Abu Dhabi' },
                                                ].map(({ value, label }) => (
                                                    <label key={value} className={styles.checkboxLabel}>
                                                        <input
                                                            type="checkbox"
                                                            checked={(formData.cities || []).includes(value)}
                                                            onChange={(e) => {
                                                                const curr = formData.cities || [];
                                                                setFormData({ ...formData, cities: e.target.checked
                                                                    ? [...curr, value]
                                                                    : curr.filter(city => city !== value) });
                                                            }}
                                                        />
                                                        <span>{label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <small className={styles.helpText}>Show this project in the selected city sections of the Area We Serve page.</small>
                                        </div>
                                    </div>
                                </div>

                                {/* Images */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Images</h3>

                                    {/* Featured Image */}
                                    <div className={styles.formGroup}>
                                        <label>Featured Image *</label>
                                        <div className={styles.imageUpload}>
                                            <input
                                                type="file"
                                                id="featuredImageUpload"
                                                accept="image/*"
                                                onChange={handleFeaturedImageChange}
                                                className={styles.fileInput}
                                            />
                                            <label htmlFor="featuredImageUpload" className={`${styles.uploadLabel} ${isUploading ? 'uploadLoading' : ''}`}>
                                                <RiUploadCloudLine className={styles.uploadIcon} />
                                                <span>Upload featured image</span>
                                            </label>
                                            {featuredImagePreview && (
                                                <div className={styles.imagePreview}>
                                                    <Image width={1000} height={1000} src={featuredImagePreview} alt="Featured" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Gallery Images */}
                                    <div className={styles.formGroup}>
                                        <label>
                                            Gallery Images ({formData.galleryImages.length}/20)
                                        </label>
                                        <div className={styles.imageUpload}>
                                            <input
                                                type="file"
                                                id="galleryImagesUpload"
                                                accept="image/*"
                                                multiple
                                                onChange={handleGalleryImagesChange}
                                                className={styles.fileInput}
                                                disabled={formData.galleryImages.length >= 20}
                                            />
                                            <label
                                                htmlFor="galleryImagesUpload"
                                                className={`${styles.uploadLabel} ${formData.galleryImages.length >= 20 ? styles.disabled : ''
                                                    }`}
                                            >
                                                <RiImageAddLine className={styles.uploadIcon} />
                                                <span>
                                                    {formData.galleryImages.length >= 20
                                                        ? 'Maximum 20 images reached'
                                                        : 'Upload gallery images (max 20)'}
                                                </span>
                                            </label>
                                            {galleryPreviews.length > 0 && (
                                                <div className={styles.galleryGrid}>
                                                    {galleryPreviews.map((img, index) => (
                                                        <div key={index} className={styles.galleryItem}>
                                                            <Image width={1000} height={1000} src={img} alt={`Gallery ${index + 1}`} />
                                                            <button
                                                                type="button"
                                                                className={styles.removeGalleryBtn}
                                                                onClick={() => removeGalleryImage(index)}
                                                            >
                                                                <RiCloseLine />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Specs */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Technical Specifications</h3>

                                    <div className={styles.formGroup}>
                                        <label>Linked Products</label>
                                        <select
                                            multiple
                                            value={formData.linkedProducts}
                                            onChange={handleProductSelect}
                                            className={styles.multiSelect}
                                        >
                                            {products.map((product) => (
                                                <option key={product._id} value={product._id}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>
                                        <small className={styles.helpText}>
                                            Hold Ctrl/Cmd to select multiple
                                        </small>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Capacity</label>
                                            <input
                                                type="text"
                                                name="capacity"
                                                value={formData.customSpecs.capacity}
                                                onChange={handleSpecChange}
                                                placeholder="e.g., 1000 kg"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Speed</label>
                                            <input
                                                type="text"
                                                name="speed"
                                                value={formData.customSpecs.speed}
                                                onChange={handleSpecChange}
                                                placeholder="e.g., 2.5 m/s"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Number of Floors</label>
                                            <input
                                                type="text"
                                                name="floors"
                                                value={formData.customSpecs.floors}
                                                onChange={handleSpecChange}
                                                placeholder="e.g., 40"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Cabin Size</label>
                                            <input
                                                type="text"
                                                name="cabinSize"
                                                value={formData.customSpecs.cabinSize}
                                                onChange={handleSpecChange}
                                                placeholder="e.g., 1.5m x 1.5m"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Drive Type</label>
                                            <input
                                                type="text"
                                                name="driveType"
                                                value={formData.customSpecs.driveType}
                                                onChange={handleSpecChange}
                                                placeholder="e.g., Gearless, Traction"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Other Specifications</label>
                                            <input
                                                type="text"
                                                name="otherSpecs"
                                                value={formData.customSpecs.otherSpecs}
                                                onChange={handleSpecChange}
                                                placeholder="Additional specs"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Testimonials */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>
                                        Testimonials ({formData.testimonials.length})
                                    </h3>

                                    {/* Add Testimonial Form */}
                                    <div className={styles.testimonialForm}>
                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Name *</label>
                                                <input type="text" name="name" value={currentTestimonial.name} onChange={handleTestimonialChange} placeholder="Client name" />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Company</label>
                                                <input type="text" name="company" value={currentTestimonial.company} onChange={handleTestimonialChange} placeholder="Company name" />
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Role / Title</label>
                                            <input type="text" name="role" value={currentTestimonial.role} onChange={handleTestimonialChange} placeholder="e.g., Villa Owner, Palm Jumeirah" />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Quote *</label>
                                            <textarea name="message" value={currentTestimonial.message} onChange={handleTestimonialChange} placeholder="Client testimonial quote…" rows="3" />
                                        </div>

                                        {/* Media toggle */}
                                        <div className={styles.formGroup}>
                                            <label>Media</label>
                                            <div className={styles.mediaToggle}>
                                                <button type="button" className={`${styles.mediaToggleBtn} ${currentTestimonial.mediaType === 'image' ? styles.mediaToggleActive : ''}`} onClick={() => setCurrentTestimonial(p => ({...p, mediaType: 'image'}))}>Image</button>
                                                <button type="button" className={`${styles.mediaToggleBtn} ${currentTestimonial.mediaType === 'video' ? styles.mediaToggleActive : ''}`} onClick={() => setCurrentTestimonial(p => ({...p, mediaType: 'video'}))}>Video</button>
                                            </div>
                                        </div>

                                        {currentTestimonial.mediaType === 'image' ? (
                                            <div className={styles.formGroup}>
                                                <label>Client Image</label>
                                                <div className={styles.testimonialMediaRow}>
                                                    <input type="text" value={currentTestimonial.image} onChange={e => setCurrentTestimonial(p => ({...p, image: e.target.value}))} placeholder="Image URL or upload →" />
                                                    <label className={`${styles.uploadSmallBtn} ${testimonialImgUploading ? 'uploadLoading' : ''}`}>
                                                        <RiUploadCloudLine />
                                                        <input type="file" accept="image/*" style={{display:'none'}} onChange={handleTestimonialImageUpload} />
                                                    </label>
                                                </div>
                                                {currentTestimonial.image && <img src={currentTestimonial.image} alt="preview" className={styles.testimonialMediaPreview} />}
                                            </div>
                                        ) : (
                                            <div className={styles.formGroup}>
                                                <label>Video URL</label>
                                                <input type="text" value={currentTestimonial.video} onChange={e => setCurrentTestimonial(p => ({...p, video: e.target.value}))} placeholder="https://… (mp4, webm, or hosted video URL)" />
                                                {currentTestimonial.video && <video src={currentTestimonial.video} className={styles.testimonialMediaPreview} muted />}
                                            </div>
                                        )}

                                        <button type="button" onClick={addTestimonial} className={styles.addTestimonialBtn}>
                                            <RiAddLine /> Add Testimonial
                                        </button>
                                    </div>

                                    {/* Testimonials List */}
                                    {formData.testimonials.length > 0 && (
                                        <div className={styles.testimonialsList}>
                                            {formData.testimonials.map((testimonial, index) => (
                                                <div key={index} className={styles.testimonialItem}>
                                                    <div className={styles.testimonialHeader}>
                                                        <div>
                                                            <strong>{testimonial.name}</strong>
                                                            {testimonial.company && <span> - {testimonial.company}</span>}
                                                            {testimonial.role && (
                                                                <span className={styles.role}> ({testimonial.role})</span>
                                                            )}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className={styles.removeTestimonialBtn}
                                                            onClick={() => removeTestimonial(index)}
                                                        >
                                                            <RiCloseLine />
                                                        </button>
                                                    </div>
                                                    {(testimonial.video || testimonial.image) && (
                                                        <span className={styles.testimonialMediaBadge}>
                                                            {testimonial.video ? '🎥 Video' : '🖼 Image'}
                                                        </span>
                                                    )}
                                                    <p className={styles.testimonialMessage}>{testimonial.message || testimonial.quote || testimonial.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* SEO / Metadata */}
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>SEO / Metadata</h3>
                                    <div className={styles.formGroup}>
                                        <label>URL Slug</label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, '') })}
                                            placeholder="auto-generated-from-title"
                                        />
                                        <small className={styles.helpText}>Page URL: /projects/{formData.slug || 'your-slug'}</small>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Meta Title</label>
                                        <input
                                            type="text"
                                            value={formData.metaTitle}
                                            onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
                                            placeholder="SEO title (defaults to project title)"
                                            maxLength={60}
                                        />
                                        <small className={styles.helpText}>{formData.metaTitle.length}/60 characters</small>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Meta Description</label>
                                        <textarea
                                            value={formData.metaDescription}
                                            onChange={e => setFormData({ ...formData, metaDescription: e.target.value })}
                                            placeholder="SEO description shown in search results (160 chars max)"
                                            rows="3"
                                            maxLength={160}
                                        />
                                        <small className={styles.helpText}>{formData.metaDescription.length}/160 characters</small>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Meta Keywords</label>
                                        <input
                                            type="text"
                                            value={formData.metaKeywords}
                                            onChange={e => setFormData({ ...formData, metaKeywords: e.target.value })}
                                            placeholder="keyword1, keyword2, keyword3"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>OG Image URL</label>
                                        <input
                                            type="text"
                                            value={formData.ogImage}
                                            onChange={e => setFormData({ ...formData, ogImage: e.target.value })}
                                            placeholder="Social share image URL (defaults to featured image)"
                                        />
                                    </div>
                                </div>

                                <div className={styles.modalActions}>
                                    <button type="button" className={styles.cancelButton} onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={styles.submitButton} disabled={isUploading}>
                                        {isUploading ? 'Uploading…' : (editingProject ? 'Update Project' : 'Create Project')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsPage;
