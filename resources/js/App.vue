<template>
	<div class="container">
		<div class="vue-tempalte">
			<div x-data="app()" x-cloak>
				<div class="max-w-3xl mx-auto px-4 py-10">


					<div v-if="explanation && step == 4">
						<div class="bg-white rounded-lg p-10 items-center shadow justify-between">
							<div>
								<svg class="mb-4 h-20 w-20 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd" />
								</svg>
								<h2 class="text-2xl mb-4 text-gray-800 text-center font-bold">Registration Success</h2>
								<table class="min-w-full">
									<thead class="border-b">
										<tr>
											<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
												#
											</th>
											<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
												First Name
											</th>
											<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
												Last Name
											</th>
											<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
												Middle Name
											</th>
											<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
												Date of Birth
											</th>
										</tr>
									</thead>
									<tbody>
										<tr class="border-b" v-for="(item, index) in display_data" :key="index">
											<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{item.id}}</td>
											<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												{{item.firstname}}
											</td>
											<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												{{item.lastname}}
											</td>
											<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												{{item.middlename ? item.middlename : '--'}}
											</td>
											<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												{{getBOD(item.dateofbirth)}}
											</td>
										</tr>
									</tbody>
								</table>

								<button @click="step1"
									class="w-60 block mx-auto focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center bg-white hover:bg-gray-100 font-medium border">Back
									to home</button>
							</div>
						</div>
					</div>

					<div v-if="step != 'complete'">
						<div class="border-b-2 py-4">
							<div class="uppercase tracking-wide text-xs font-bold text-gray-500 mb-1 leading-tight"
								x-text="`Step: ${step} of 3`"></div>
							<div class="flex flex-col md:flex-row md:items-center md:justify-between">
								<div class="flex-1">
									<div v-if="step === 1">
										<div class="text-lg font-bold text-gray-700 leading-tight">Your Profile</div>
									</div>

									<div v-if="step === 2">
										<div class="text-lg font-bold text-gray-700 leading-tight">Your Date of birth</div>
									</div>

									<div v-if="step === 3">
										<div class="text-lg font-bold text-gray-700 leading-tight">Tell me about yourself</div>
									</div>
								</div>

								<div class="flex items-center md:w-64" v-if="step != 4">
									<div class="w-full bg-white rounded-full mr-2">
										<div class="rounded-full bg-green-500 text-xs leading-none h-2 text-center text-white"
											:style="'width: '+ parseInt(step / 3 * 100) +'%'"></div>
									</div>
									<div class="text-xs w-10 text-gray-600" x-text="parseInt(step / 3 * 100) +'%'"></div>
								</div>
							</div>
						</div>

						<div class="py-10">
							<div v-if="step === 1 && explanation == ''">
								<div class="mb-5">
									<label for="firstname" class="font-bold mb-1 text-gray-700 block">Firstname</label>
									<input type="text" v-model="firstname" pattern="[A-Za-z]"
										class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
										placeholder="Enter your firstname...">
									<span v-if="errors.firstname" class="form__label text-danger">{{ errors.firstname[0] }}</span>
								</div>
								<div class="mb-5">
									<label for="lastname" class="font-bold mb-1 text-gray-700 block">Lastname</label>
									<input type="text" v-model="lastname"
										class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
										placeholder="Enter your lastname...">
									<span v-if="errors.lastname" class="form__label text-danger">{{ errors.lastname[0] }}</span>
								</div>
							</div>
							<div v-if="step === 2 && explanation == ''">
								<div class="mb-5">
									<label for="middlename" class="font-bold mb-1 text-gray-700 block">Middlename</label>
									<input type="text" v-model="middlename"
										class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
										placeholder="Enter your middlename...">
								</div>
							</div>
							<div v-if="step === 3 && explanation == ''">
								<div class="mb-5">
									<label for="dateofbirth" class="font-bold mb-1 text-gray-700 block">Date of birth</label>
									<datepicker ref="datepicker1" v-model="dateofbirth"></datepicker>
									<span v-if="errors.dateofbirth" class="form__label text-danger">{{ errors.dateofbirth[0] }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="fixed bottom-0 left-0 right-0 py-5 bg-white shadow-md" v-if="step != 'complete'">
					<div class="max-w-3xl mx-auto px-4">
						<div class="flex justify-between">
							<div class="w-1/2">
								<button v-if="step > 1 && step <= 3" @click="step--"
									class="w-32 focus:outline-none py-2  rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border">Previous</button>
							</div>

							<div class="w-1/2 text-right">
								<button v-if="step < 3" @click="nextStep"
									class="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium">Next</button>

								<button @click="submit" v-if="step === 3"
									class="w-32 focus:outline-none border border-transparent py-2  rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium">Complete</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Datepicker from 'vuejs3-datepicker';
export default {
	components: {
		Datepicker
	},
	data() {
		return {
			step: 1,
			firstname: '',
			lastname: '',
			middlename: '',
			dateofbirth: new Date(),
			errors: '',
			explanation: '', display_data: '',
		}
	},
	methods: {
		submit() {
			let formData = {
				firstname: this.firstname,
				lastname: this.lastname,
				middlename: this.middlename,
				dateofbirth: this.dateofbirth
			}
			var that = this;
			axios.post('/api/register-user', formData)
				.then(function (response) {
					if (response.data.status == 'success') {
						that.step = 4
						that.explanation = response.data.status
						that.display_data = response.data.data
					}
				})
				.catch(error => {
					if (error.response) {
						that.errors = error.response.data.errors
					}
				});
		},
		step1() {
			this.explanation = ''
			this.step = 1
			this.firstname = ''
			this.lastname = ''
			this.middlename = ''
			this.dateofbirth = ''
			location.reload();
		},
		nextStep() {
			var that = this;
			axios.post('api/check-user', {
				firstname: this.firstname,
				lastname: this.lastname
			})
				.then(function (response) {
					if (response.data.status == 'success') {
						that.step++
					}
				})
				.catch(error => {
					if (error.response) {
						that.errors = error.response.data.errors
						console.log("error", that.errors)
					}
				});
		},
		getBOD(dates) {
			var date = new Date(dates);
			return (date.getDate() > 9 ? '' : '0') + date.getDate() + '/' + ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1) + '/' + date.getFullYear();
		}
	},
}
</script>

<style>
.vuejs3-datepicker {
	width: 100%;
}
.vuejs3-datepicker__value {
	width: 100%;
}
</style>