<template>
  <div class="project-view">
    <div class="header">
      <h1>Project Details</h1>
      <div class="header-actions">
        <router-link :to="`/admin/projects/${$route.params.id}/edit`" class="btn btn-primary">
          <i class="fas fa-edit"></i> Edit
        </router-link>
        <router-link to="/admin/projects" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i> Back to Projects
        </router-link>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Loading project...
    </div>

    <div v-else-if="project" class="project-details">
      <!-- Project Header -->
      <div class="project-header">
        <div class="project-image-container">
          <img
            :src="project.image || '/images/placeholder.jpg'"
            :alt="project.name"
            class="project-image"
          />
        </div>
        <div class="project-info">
          <h2>{{ project.name }}</h2>
          <p class="slug">{{ project.slug }}</p>
          <span :class="['status-badge', `status-${project.status}`]">
            {{ project.status }}
          </span>
        </div>
      </div>

      <!-- Description Section -->
      <div class="info-section">
        <h3><i class="fas fa-align-left"></i> Description</h3>
        <p class="description">{{ project.description }}</p>
      </div>

      <!-- Full Description -->
      <div v-if="project.fullDescription" class="info-section">
        <h3><i class="fas fa-file-alt"></i> Full Description</h3>
        <div class="full-description">{{ project.fullDescription }}</div>
      </div>

      <!-- Project Details Grid -->
      <div class="info-section">
        <h3><i class="fas fa-info-circle"></i> Project Information</h3>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Location:</span>
            <span class="detail-value">{{ project.location || 'Not specified' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Beneficiaries:</span>
            <span class="detail-value">{{ project.beneficiaries || 'Not specified' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Start Date:</span>
            <span class="detail-value">{{ formatDate(project.startDate) || 'Not specified' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">End Date:</span>
            <span class="detail-value">{{ formatDate(project.endDate) || 'Not specified' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Created:</span>
            <span class="detail-value">{{ formatDateTime(project.createdAt) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Last Updated:</span>
            <span class="detail-value">{{ formatDateTime(project.updatedAt) }}</span>
          </div>
        </div>
      </div>

      <!-- Objectives -->
      <div v-if="project.objectives && project.objectives.length > 0" class="info-section">
        <h3><i class="fas fa-bullseye"></i> Objectives</h3>
        <ul class="objectives-list">
          <li v-for="(objective, index) in project.objectives" :key="index">
            {{ objective }}
          </li>
        </ul>
      </div>

      <!-- Impact Metrics -->
      <div v-if="project.impact && Object.keys(project.impact).length > 0" class="info-section">
        <h3><i class="fas fa-chart-line"></i> Impact Metrics</h3>
        <div class="impact-grid">
          <div v-for="(value, key) in project.impact" :key="key" class="impact-card">
            <div class="impact-value">{{ value }}</div>
            <div class="impact-label">{{ key }}</div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="actions-section">
        <router-link :to="`/admin/projects/${project.id}/edit`" class="btn btn-primary">
          <i class="fas fa-edit"></i> Edit Project
        </router-link>
        <button @click="confirmDelete" class="btn btn-danger">
          <i class="fas fa-trash"></i> Delete Project
        </button>
      </div>
    </div>

    <div v-else class="error-state">
      <i class="fas fa-exclamation-triangle"></i>
      <p>Project not found</p>
      <router-link to="/admin/projects" class="btn btn-primary">
        Back to Projects
      </router-link>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="showDeleteModal = false">
      <div class="modal-content" @click.stop>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete "{{ project?.name }}"? This action cannot be undone.</p>
        <div class="modal-actions">
          <button @click="showDeleteModal = false" class="btn btn-secondary">Cancel</button>
          <button @click="deleteProject" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProjectsStore } from '../../../stores/projects';

export default {
  name: 'ProjectView',
  data() {
    return {
      project: null,
      loading: false,
      showDeleteModal: false,
    };
  },
  setup() {
    const projectsStore = useProjectsStore();
    return { projectsStore };
  },
  mounted() {
    this.loadProject();
  },
  methods: {
    async loadProject() {
      this.loading = true;
      try {
        const projectId = this.$route.params.id;
        this.project = await this.projectsStore.fetchProject(projectId);
      } catch (error) {
        console.error('Error loading project:', error);
        alert('Failed to load project');
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    formatDateTime(dateString) {
      if (!dateString) return '';
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    confirmDelete() {
      this.showDeleteModal = true;
    },
    async deleteProject() {
      try {
        await this.projectsStore.deleteProject(this.project.id);
        this.showDeleteModal = false;
        this.$router.push('/admin/projects');
        alert('Project deleted successfully');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    },
  },
};
</script>

<style scoped>
.project-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  margin: 0;
  color: #333;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.loading,
.error-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading {
  font-size: 1.2rem;
  color: #666;
}

.error-state i {
  font-size: 3rem;
  color: #f44336;
  margin-bottom: 1rem;
}

.error-state p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.project-details {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.project-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.project-image-container {
  position: relative;
}

.project-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.project-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.slug {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.info-section {
  padding: 2rem;
  border-bottom: 1px solid #eee;
}

.info-section:last-of-type {
  border-bottom: none;
}

.info-section h3 {
  color: #333;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-section h3 i {
  color: #667eea;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.full-description {
  line-height: 1.8;
  color: #555;
  white-space: pre-wrap;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
}

.detail-value {
  color: #333;
  font-size: 1rem;
}

.objectives-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.objectives-list li {
  padding: 0.75rem;
  background: #f8f9fa;
  border-left: 4px solid #667eea;
  margin-bottom: 0.75rem;
  border-radius: 4px;
}

.objectives-list li:before {
  content: "✓";
  color: #667eea;
  font-weight: bold;
  margin-right: 0.5rem;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.impact-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem;
  border-radius: 8px;
  color: white;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.impact-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.impact-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.actions-section {
  padding: 2rem;
  background: #f8f9fa;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: #2196f3;
  color: white;
}

.btn-primary:hover {
  background: #1976d2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background: #bdbdbd;
}

.btn-danger {
  background: #f44336;
  color: white;
}

.btn-danger:hover {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
}

.modal-overlay {
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
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
}

.modal-content h3 {
  margin-top: 0;
  color: #f44336;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .project-header {
    grid-template-columns: 1fr;
  }

  .project-image {
    height: 200px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .impact-grid {
    grid-template-columns: 1fr;
  }

  .actions-section {
    flex-direction: column;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
