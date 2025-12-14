<template>
    <div>
        <!-- Hero Section -->
        <section
            class="relative bg-gradient-to-br from-secondary to-secondary-700 py-32 overflow-hidden"
        >
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img
                    src="/images/hero3.jpg"
                    alt="Support Our Causes"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-r from-black/75 to-black/75"
                ></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="inline-block mb-6">
                        <span
                            class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold"
                        >
                            Make a Difference
                        </span>
                    </div>
                    <h1
                        class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        Support Our Causess
                    </h1>
                    <p
                        class="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
                    >
                        Your donation transforms lives and creates opportunities
                        for quality education across Africa
                    </p>
                    <div class="flex flex-wrap gap-4 justify-center">
                        <div
                            class="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4"
                        >
                            <div class="text-3xl font-bold text-white">
                                <span v-if="loading">
                                    <Loader2 class="w-8 h-8 animate-spin" />
                                </span>
                                <span v-else>
                                    {{ publicCauses.length }}
                                </span>
                            </div>
                            <div class="text-sm text-white/80">
                                Active Causes
                            </div>
                        </div>
                        <div
                            class="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4"
                        >
                            <div class="text-3xl font-bold text-white">
                                100%
                            </div>
                            <div class="text-sm text-white/80">
                                Transparency
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Introduction Section -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-4xl mx-auto text-center">
                    <span
                        class="text-secondary font-semibold text-sm uppercase tracking-wide"
                    >
                        Why Donate
                    </span>
                    <h2 class="text-4xl font-bold text-neutral-900 mt-4 mb-6">
                        Every Contribution Counts
                    </h2>
                    <p class="text-xl text-neutral-600 leading-relaxed mb-8">
                        Your generous donation directly supports our mission to
                        transform science education across Africa. We ensure
                        100% transparency in how your funds are used, with
                        regular updates on the impact of your contribution.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            >
                                <Shield class="w-8 h-8 text-secondary" />
                            </div>
                            <h3 class="text-lg font-bold text-neutral-900 mb-2">
                                100% Transparent
                            </h3>
                            <p class="text-sm text-neutral-600">
                                Full accountability on fund usage
                            </p>
                        </div>
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            >
                                <Heart class="w-8 h-8 text-secondary" />
                            </div>
                            <h3 class="text-lg font-bold text-neutral-900 mb-2">
                                Direct Impact
                            </h3>
                            <p class="text-sm text-neutral-600">
                                Your funds reach those in need
                            </p>
                        </div>
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            >
                                <TrendingUp class="w-8 h-8 text-secondary" />
                            </div>
                            <h3 class="text-lg font-bold text-neutral-900 mb-2">
                                Proven Results
                            </h3>
                            <p class="text-sm text-neutral-600">
                                Measurable outcomes and success stories
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Causes Grid -->
        <section class="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
            <div class="container-custom">
                <div class="max-w-7xl mx-auto">
                    <!-- Loading State -->
                    <div v-if="loading" class="flex items-center justify-center py-12">
                        <div class="text-center">
                            <Loader2 class="w-12 h-12 animate-spin text-secondary mx-auto mb-4" />
                            <p class="text-neutral-600 text-lg">Loading causes...</p>
                        </div>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="error" class="text-center py-12">
                        <div class="max-w-md mx-auto">
                            <AlertCircle class="w-16 h-16 text-red-500 mx-auto mb-4" />
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">Unable to Load Causes</h3>
                            <p class="text-neutral-600 mb-4">{{ error }}</p>
                            <button
                                @click="fetchPublicCauses"
                                class="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors font-medium flex items-center mx-auto"
                            >
                                <RefreshCcw class="w-4 h-4 mr-2" />
                                Try Again
                            </button>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-else-if="publicCauses.length === 0" class="text-center py-12">
                        <div class="max-w-md mx-auto">
                            <Heart class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">No Active Causes</h3>
                            <p class="text-neutral-600">There are currently no active causes available for donations.</p>
                        </div>
                    </div>

                    <!-- Causes Grid -->
                    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div
                            v-for="cause in publicCauses"
                            :key="cause.id"
                            class="group"
                        >
                            <div
                                class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-200 h-full flex flex-col"
                            >
                                <!-- Image -->
                                <div
                                    class="aspect-video overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 relative"
                                >
                                    <img
                                        :src="cause.image"
                                        :alt="cause.title"
                                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <!-- Urgency Badge -->
                                    <div class="absolute top-4 right-4">
                                        <span
                                            :class="[
                                                'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
                                                getUrgencyClass(cause.urgency),
                                            ]"
                                        >
                                            {{ cause.urgency }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Content -->
                                <div class="p-6 flex-1 flex flex-col">
                                    <!-- Category Badge -->
                                    <div class="mb-3">
                                        <span
                                            class="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold uppercase tracking-wide"
                                        >
                                            {{ cause.category }}
                                        </span>
                                    </div>

                                    <!-- Title -->
                                    <h3
                                        class="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-secondary transition-colors"
                                    >
                                        {{ cause.title }}
                                    </h3>

                                    <!-- Description -->
                                    <p
                                        class="text-neutral-600 mb-4 leading-relaxed line-clamp-2"
                                    >
                                        {{ cause.description }}
                                    </p>

                                    <!-- Progress Bar -->
                                    <!-- <div class="mb-4">
                    <div class="flex justify-between text-sm mb-2">
                      <span class="text-neutral-600">
                        Raised: {{ formatCurrency(cause.raisedAmount) }}
                      </span>
                      <span class="text-neutral-900 font-semibold">
                        Goal: {{ formatCurrency(cause.goalAmount) }}
                      </span>
                    </div>
                    <div
                      class="w-full bg-neutral-200 rounded-full h-3 overflow-hidden"
                    >
                      <div
                        class="bg-gradient-to-r from-secondary to-accent h-full rounded-full transition-all duration-500"
                        :style="{ width: getProgress(cause) + '%' }"
                      ></div>
                    </div>
                    <p class="text-xs text-neutral-500 mt-1">
                      {{ getProgress(cause) }}% funded
                    </p>
                  </div> -->

                                    <!-- Meta Info -->
                                    <div class="mt-auto space-y-2 mb-4">
                                        <div
                                            class="flex items-center gap-2 text-sm text-neutral-500"
                                        >
                                            <Users class="w-4 h-4" />
                                            <span>{{
                                                cause.beneficiaries
                                            }}</span>
                                        </div>
                                    </div>

                                    <!-- Buttons -->
                                    <div class="flex gap-3">
                                        <button
                                            @click="selectedCause = cause"
                                            class="flex-1 px-4 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium text-sm"
                                        >
                                            Learn More
                                        </button>
                                        <button
                                            @click="openDonateModal(cause)"
                                            class="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-secondary-600 transition-colors font-medium text-sm flex items-center justify-center"
                                        >
                                            <Heart class="w-4 h-4 mr-2" />
                                            Donate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <span
                            class="text-primary font-semibold text-sm uppercase tracking-wide"
                        >
                            Our Process
                        </span>
                        <h2
                            class="text-4xl font-bold text-neutral-900 mt-4 mb-4"
                        >
                            How Your Donation Helps
                        </h2>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary"
                            >
                                1
                            </div>
                            <h3 class="text-lg font-bold text-neutral-900 mb-2">
                                Choose
                            </h3>
                            <p class="text-sm text-neutral-600">
                                Select a cause that resonates with you
                            </p>
                        </div>
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary"
                            >
                                2
                            </div>
                            <h3 class="text-lg font-bold text-neutral-900 mb-2">
                                Donate
                            </h3>
                            <p class="text-sm text-neutral-600">
                                Make a secure donation of any amount
                            </p>
                        </div>
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary"
                            >
                                3
                            </div>
                            <h3 class="text-lg font-bold text-neutral-900 mb-2">
                                Impact
                            </h3>
                            <p class="text-sm text-neutral-600">
                                Your funds are allocated to the cause
                            </p>
                        </div>
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary"
                            >
                                4
                            </div>
                            <h3 class="text-lg font-bold text-neutral-900 mb-2">
                                Updates
                            </h3>
                            <p class="text-sm text-neutral-600">
                                Receive regular reports on impact
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Cause Detail Modal -->
        <div
            v-if="selectedCause"
            class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto"
            @click.self="selectedCause = null"
        >
            <div
                class="bg-white rounded-2xl max-w-4xl w-full shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
                <!-- Modal Header Image -->
                <div
                    class="aspect-video overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 relative"
                >
                    <img
                        :src="selectedCause.image"
                        :alt="selectedCause.title"
                        class="w-full h-full object-cover"
                    />
                    <div class="absolute top-4 right-4">
                        <span
                            :class="[
                                'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
                                getUrgencyClass(selectedCause.urgency),
                            ]"
                        >
                            {{ selectedCause.urgency }}
                        </span>
                    </div>
                </div>

                <!-- Modal Content -->
                <div class="p-8">
                    <!-- Close Button -->
                    <button
                        @click="selectedCause = null"
                        class="float-right p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <X class="w-6 h-6 text-neutral-600" />
                    </button>

                    <!-- Category Badge -->
                    <span
                        class="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold uppercase tracking-wide mb-4"
                    >
                        {{ selectedCause.category }}
                    </span>

                    <!-- Title -->
                    <h2
                        class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
                    >
                        {{ selectedCause.title }}
                    </h2>

                    <!-- Progress -->
                    <div class="mb-6">
                        <div class="flex justify-between text-sm mb-2">
                            <span class="text-neutral-600">
                                Raised:
                                {{ formatCurrency(selectedCause.raised_amount || selectedCause.raisedAmount || 0) }}
                            </span>
                            <span class="text-neutral-900 font-semibold">
                                Goal:
                                {{ formatCurrency(selectedCause.goal_amount || selectedCause.goalAmount || 0) }}
                            </span>
                        </div>
                        <div
                            class="w-full bg-neutral-200 rounded-full h-4 overflow-hidden"
                        >
                            <div
                                class="bg-gradient-to-r from-secondary to-accent h-full rounded-full"
                                :style="{
                                    width: getProgress(selectedCause) + '%',
                                }"
                            ></div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-neutral-900 mb-3">
                            About This Cause
                        </h3>
                        <p class="text-neutral-700 leading-relaxed">
                            {{ selectedCause.full_description || selectedCause.fullDescription }}
                        </p>
                    </div>

                    <!-- Impact -->
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-neutral-900 mb-3">
                            Your Impact
                        </h3>
                        <ul class="space-y-2">
                            <li
                                v-for="(impact, index) in selectedCause.impact"
                                :key="index"
                                class="flex items-start gap-3"
                            >
                                <div
                                    class="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                >
                                    <CheckCircle
                                        class="w-4 h-4 text-secondary"
                                    />
                                </div>
                                <span class="text-neutral-700">{{
                                    impact
                                }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Donation Tiers -->
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-neutral-900 mb-3">
                            Ways to Contribute
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div
                                v-for="(
                                    tier, index
                                ) in (selectedCause.donation_tiers || selectedCause.donationTiers)"
                                :key="index"
                                class="p-4 border-2 border-neutral-200 rounded-lg hover:border-secondary transition-colors cursor-pointer"
                                @click="
                                    donationAmount = tier.amount;
                                    showDonateModal = true;
                                "
                            >
                                <div
                                    class="flex items-center justify-between mb-2"
                                >
                                    <span
                                        class="text-2xl font-bold text-secondary"
                                    >
                                        ${{ tier.amount }}
                                    </span>
                                    <DollarSign
                                        class="w-5 h-5 text-secondary"
                                    />
                                </div>
                                <p class="text-sm text-neutral-600">
                                    {{ tier.description }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- CTA Buttons -->
                    <div
                        class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-neutral-200"
                    >
                        <button
                            @click="openDonateModal(selectedCause)"
                            class="flex-1 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors font-medium flex items-center justify-center"
                        >
                            <Heart class="w-5 h-5 mr-2" />
                            Donate Now
                        </button>
                        <button
                            @click="selectedCause = null"
                            class="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Donate Modal -->
        <div
            v-if="showDonateModal"
            class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            @click.self="showDonateModal = false"
        >
            <div class="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
                <div class="text-center mb-6">
                    <div
                        class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <Heart class="w-8 h-8 text-secondary" />
                    </div>
                    <h3 class="text-2xl font-bold text-neutral-900 mb-2">
                        Make a Donation
                    </h3>
                    <p class="text-neutral-600 text-sm">
                        Your contribution makes a real difference
                    </p>
                </div>

                <!-- Donation Form -->
                <div class="space-y-4">
                    <div>
                        <label
                            class="block text-sm font-semibold text-neutral-700 mb-2"
                        >
                            Donation Amount (USD)
                        </label>
                        <input
                            v-model="donationAmount"
                            type="number"
                            min="1"
                            placeholder="Enter amount"
                            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        />
                    </div>

                    <div class="grid grid-cols-4 gap-2">
                        <button
                            v-for="amount in [25, 50, 100, 250]"
                            :key="amount"
                            @click="donationAmount = amount"
                            class="px-4 py-2 border-2 border-neutral-300 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-colors text-sm font-medium"
                        >
                            ${{ amount }}
                        </button>
                    </div>

                    <!-- Payment Method Selection -->
                    <div>
                        <label
                            class="block text-sm font-semibold text-neutral-700 mb-3"
                        >
                            Select Payment Method
                        </label>
                        <div class="grid grid-cols-1 gap-3">
                            <!-- MTN Mobile Money -->
                            <button
                                @click="selectedPaymentMethod = 'mtn'"
                                :class="[
                                    'flex items-center gap-3 p-4 border-2 rounded-lg transition-all',
                                    selectedPaymentMethod === 'mtn'
                                        ? 'border-secondary bg-secondary/5'
                                        : 'border-neutral-300 hover:border-neutral-400',
                                ]"
                            >
                                <div
                                    class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0"
                                >
                                    <Smartphone class="w-6 h-6 text-white" />
                                </div>
                                <div class="text-left flex-1">
                                    <div class="font-semibold text-neutral-900">
                                        MTN Mobile Money
                                    </div>
                                    <div class="text-xs text-neutral-500">
                                        Pay with MTN MoMo
                                    </div>
                                </div>
                                <div
                                    v-if="selectedPaymentMethod === 'mtn'"
                                    class="w-5 h-5 bg-secondary rounded-full flex items-center justify-center"
                                >
                                    <CheckCircle class="w-4 h-4 text-white" />
                                </div>
                            </button>

                            <!-- Airtel Money -->
                            <button
                                @click="selectedPaymentMethod = 'airtel'"
                                :class="[
                                    'flex items-center gap-3 p-4 border-2 rounded-lg transition-all',
                                    selectedPaymentMethod === 'airtel'
                                        ? 'border-secondary bg-secondary/5'
                                        : 'border-neutral-300 hover:border-neutral-400',
                                ]"
                            >
                                <div
                                    class="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0"
                                >
                                    <Smartphone class="w-6 h-6 text-white" />
                                </div>
                                <div class="text-left flex-1">
                                    <div class="font-semibold text-neutral-900">
                                        Airtel Money
                                    </div>
                                    <div class="text-xs text-neutral-500">
                                        Pay with Airtel Money
                                    </div>
                                </div>
                                <div
                                    v-if="selectedPaymentMethod === 'airtel'"
                                    class="w-5 h-5 bg-secondary rounded-full flex items-center justify-center"
                                >
                                    <CheckCircle class="w-4 h-4 text-white" />
                                </div>
                            </button>

                            <!-- Credit Card -->
                            <button
                                @click="selectedPaymentMethod = 'card'"
                                :class="[
                                    'flex items-center gap-3 p-4 border-2 rounded-lg transition-all',
                                    selectedPaymentMethod === 'card'
                                        ? 'border-secondary bg-secondary/5'
                                        : 'border-neutral-300 hover:border-neutral-400',
                                ]"
                            >
                                <div
                                    class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0"
                                >
                                    <CreditCard class="w-6 h-6 text-white" />
                                </div>
                                <div class="text-left flex-1">
                                    <div class="font-semibold text-neutral-900">
                                        Credit/Debit Card
                                    </div>
                                    <div class="text-xs text-neutral-500">
                                        Visa, Mastercard, or American Express
                                    </div>
                                </div>
                                <div
                                    v-if="selectedPaymentMethod === 'card'"
                                    class="w-5 h-5 bg-secondary rounded-full flex items-center justify-center"
                                >
                                    <CheckCircle class="w-4 h-4 text-white" />
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Mobile Money Phone Number Input -->
                    <div
                        v-if="
                            selectedPaymentMethod === 'mtn' ||
                            selectedPaymentMethod === 'airtel'
                        "
                        class="animate-fadeIn"
                    >
                        <label
                            class="block text-sm font-semibold text-neutral-700 mb-2"
                        >
                            Phone Number
                        </label>
                        <input
                            v-model="phoneNumber"
                            type="tel"
                            placeholder="e.g., 0700000000"
                            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        />
                    </div>

                    <!-- Card Details Input -->
                    <div
                        v-if="selectedPaymentMethod === 'card'"
                        class="space-y-3 animate-fadeIn"
                    >
                        <div>
                            <label
                                class="block text-sm font-semibold text-neutral-700 mb-2"
                            >
                                Card Number
                            </label>
                            <input
                                v-model="cardNumber"
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                maxlength="19"
                                class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                            />
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label
                                    class="block text-sm font-semibold text-neutral-700 mb-2"
                                >
                                    Expiry Date
                                </label>
                                <input
                                    v-model="cardExpiry"
                                    type="text"
                                    placeholder="MM/YY"
                                    maxlength="5"
                                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-semibold text-neutral-700 mb-2"
                                >
                                    CVV
                                </label>
                                <input
                                    v-model="cardCvv"
                                    type="text"
                                    placeholder="123"
                                    maxlength="4"
                                    class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <p class="text-xs text-neutral-500 italic">
                        * This is a demonstration. In production, this would
                        integrate with a secure payment processor.
                    </p>
                </div>

                <div class="flex gap-3 mt-6">
                    <button
                        @click="showDonateModal = false"
                        class="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        @click="processDonation"
                        :disabled="!isPaymentMethodValid"
                        :class="[
                            'flex-1 px-6 py-3 rounded-lg transition-colors font-medium',
                            isPaymentMethodValid
                                ? 'bg-secondary text-white hover:bg-secondary-600'
                                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed',
                        ]"
                    >
                        Donate ${{ donationAmount }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
    Users,
    Heart,
    X,
    CheckCircle,
    DollarSign,
    Shield,
    TrendingUp,
    Smartphone,
    CreditCard,
    Loader2,
    AlertCircle,
    RefreshCcw,
} from "lucide-vue-next";
import { useCausesStore } from "@/stores/causes";
import axios from "axios";

const causesStore = useCausesStore();
const selectedCause = ref(null);
const showDonateModal = ref(false);
const donationAmount = ref(50);
const selectedPaymentMethod = ref(null);
const phoneNumber = ref("");
const cardNumber = ref("");
const cardExpiry = ref("");
const cardCvv = ref("");

// Loading and error states
const loading = ref(false);
const error = ref(null);
const publicCauses = ref([]);

// Fetch public causes from API
const fetchPublicCauses = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await axios.get('/api/causes/active');
        publicCauses.value = response.data.data || response.data;
        
        // Also update the causes store for backward compatibility
        causesStore.causes = publicCauses.value;
        causesStore.updateStatistics();
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to load causes. Please try again.';
        console.error('Error fetching public causes:', err);
    } finally {
        loading.value = false;
    }
};

const totalRaised = computed(() => {
    return publicCauses.value.reduce((sum, cause) => sum + (cause.raised_amount || cause.raisedAmount || 0), 0);
});

const isPaymentMethodValid = computed(() => {
    if (!selectedPaymentMethod.value) return false;

    if (
        selectedPaymentMethod.value === "mtn" ||
        selectedPaymentMethod.value === "airtel"
    ) {
        return phoneNumber.value.length >= 10;
    }

    if (selectedPaymentMethod.value === "card") {
        return (
            cardNumber.value.length >= 13 &&
            cardExpiry.value.length === 5 &&
            cardCvv.value.length >= 3
        );
    }

    return false;
});

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "UGX",
        minimumFractionDigits: 0,
    }).format(amount);
};

const getProgress = (cause) => {
    const raised = cause.raised_amount || cause.raisedAmount || 0;
    const goal = cause.goal_amount || cause.goalAmount || 0;
    if (goal === 0) return 0;
    return Math.min(Math.round((raised / goal) * 100), 100);
};

const getUrgencyClass = (urgency) => {
    const classes = {
        Critical: "bg-red-100 text-red-700",
        High: "bg-orange-100 text-orange-700",
        Medium: "bg-yellow-100 text-yellow-700",
        Low: "bg-green-100 text-green-700",
    };
    return classes[urgency] || "bg-neutral-100 text-neutral-700";
};

const openDonateModal = (cause) => {
    selectedCause.value = null;
    showDonateModal.value = true;
};

const processDonation = () => {
    const paymentMethodNames = {
        mtn: "MTN Mobile Money",
        airtel: "Airtel Money",
        card: "Credit/Debit Card",
    };

    const methodName = paymentMethodNames[selectedPaymentMethod.value];
    let message = `Thank you for your donation of $${donationAmount.value} via ${methodName}!\n\n`;

    if (
        selectedPaymentMethod.value === "mtn" ||
        selectedPaymentMethod.value === "airtel"
    ) {
        message += `A payment request will be sent to ${phoneNumber.value}.\n`;
    } else if (selectedPaymentMethod.value === "card") {
        message += `Your card ending in ${cardNumber.value.slice(
            -4
        )} will be charged.\n`;
    }

    message +=
        "\nIn a real application, this would process your payment securely.";

    alert(message);

    // Reset form
    showDonateModal.value = false;
    donationAmount.value = 50;
    selectedPaymentMethod.value = null;
    phoneNumber.value = "";
    cardNumber.value = "";
    cardExpiry.value = "";
    cardCvv.value = "";
};

onMounted(() => {
    fetchPublicCauses();
});
</script>
