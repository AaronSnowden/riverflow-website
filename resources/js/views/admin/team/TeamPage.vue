<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900">Manage Team</h1>
        <p class="text-neutral-600 mt-2">Add, edit, or delete team members</p>
      </div>
      <button class="btn-primary">
        <Plus class="w-5 h-5 mr-2" />
        Add Team Member
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <LeaderCard v-for="leader in siteStore.leaders" :key="leader.id" :leader="leader" />
    </div>
  </div>
</template>

<script setup>
import { Plus } from 'lucide-vue-next'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
</script>

