<template>
  <div class="q-my-sm-lg no-shadow row">
   <div class="q-mb-lg col-md-8 row q-mx-auto">
     <q-stepper
       class="no-shadow full-width col-12"
       v-model="step"
       ref="stepper"
       done-color="green-9"
       active-color="dark"
       animated
     >
       <q-step
         :name="1"
         title="Login"
         icon="settings"
         :done="step > 1"
       >
       </q-step>

       <q-step
         :name="2"
         title="Check delivery information"
         icon="where_to_vote"
         :done="step > 2"
       >
         <div class="col-12 row">
           <div class="col-md-6">
             <div>
               <div class="col-12 text-h5 flex items-center text-weight-bold q-mb-md">
                 <q-icon size="md" name="perm_identity"/>
                 Your information
               </div>
               <div class="col-12">
                 <div class="q-my-sm col-12">
                   <label>Your email address</label>
                   <q-input outlined v-model="email" color="dark" />
                 </div>
                 <div class="col-12 row">
                   <div class="q-my-sm col-6">
                     <div class="col-12 q-mr-xs">
                       <label>First name</label>
                       <q-input outlined v-model="email" color="dark" />
                     </div>
                   </div>
                   <div class="q-my-sm col-6">
                     <label>Last name</label>
                     <q-input outlined v-model="email" color="dark" />
                   </div>
                 </div>
                 <div class="q-my-sm col-12">
                   <label>Your address</label>
                   <q-input outlined v-model="email" color="dark" />
                 </div>
                 <div class="q-my-sm col-12">
                   <label>Your phone number</label>
                   <q-input outlined v-model="email" color="dark" />
                 </div>
                 <div class="q-my-sm col-12">
                   <label>Leave your note for us</label>
                   <q-input type="textarea" rows="3" outlined v-model="email" color="dark" />
                 </div>
               </div>
             </div>
           </div>
           <div class="col-md-6">
             <div class="q-ml-md">
               <div class="col-12 text-h5 flex items-center text-weight-bold q-mb-md">
                 <q-icon size="md" name="shopping_cart"/>
                 Shipping method
               </div>
               <div class="col-12">
                 <q-list bordered separator>
                   <q-item tag="label" class="q-py-lg" v-ripple>
                     <q-item-section side top>
                       <q-checkbox :disable="payment.check2 === true" color="dark" v-model="payment.check1" />
                     </q-item-section>

                     <q-item-section>
                       <q-item-label>Normal delivery</q-item-label>
                       <q-item-label caption>
                         Your item will be delivered within 7-10 days except weekends
                         ($30 for this)
                       </q-item-label>
                     </q-item-section>
                   </q-item>

                   <q-item tag="label" class="q-py-lg"  v-ripple>
                     <q-item-section  side top>
                       <q-checkbox :disable="payment.check1 === true" color="dark" v-model="payment.check2" />
                     </q-item-section>

                     <q-item-section>
                       <q-item-label>Express delivery</q-item-label>
                       <q-item-label caption>
                         Your item will be delivered within 2-3 days except weekends
                         ($35 for this)
                       </q-item-label>
                     </q-item-section>
                   </q-item>
                 </q-list>
               </div>
             </div>
           </div>
         </div>
       </q-step>
       <q-step
         :name="3"
         title="Payment options"
         icon="local_atm"
         :done="step > 3"
       >
         <div class="col-12 row">
           <div class="col-12">
             <div class="col-12 text-h5 flex items-center text-weight-bold q-mb-md">
               <q-icon size="md" name="local_atm"/>
               Choose payment options
             </div>
             <div class="col-12 row">
               <q-list bordered separator class="col-12 row">
                 <q-slide-item class="row col-12">
                   <q-item class="col-12">
                     <q-item-section avatar>
                       <q-radio v-model="paymentOptions" val="opt1" color="dark" />
                     </q-item-section>
                     <q-item-section>Payment on delivery</q-item-section>
                   </q-item>
                 </q-slide-item>

                 <q-slide-item class="col-12">
                   <q-item>
                     <q-item-section avatar>
                       <q-radio v-model="paymentOptions" val="opt2" color="dark" />
                     </q-item-section>
                     <q-item-section>Online payment</q-item-section>
                   </q-item>
                   <q-item class="no-padding">
                     <q-splitter
                       class="full-width"
                       style="height: auto"
                       v-model="splitterModel"
                     >

                       <template v-slot:before>
                         <q-tabs
                           v-model="tab"
                           vertical
                           class="text-dark"
                         >
                           <q-tab name="credit_card" label="Credit card">
                             <q-icon size="md" class="fas fa-money-check"></q-icon>
                           </q-tab>
                           <q-tab name="payPal" label="Pay pal">
                             <q-icon size="md" class="fab fa-paypal"></q-icon>
                           </q-tab>
                           <q-tab name="banking" label="Net banking">
                             <q-icon size="md" class="fas fa-university"></q-icon>
                           </q-tab>
                         </q-tabs>
                       </template>

                       <template v-slot:after>
                         <q-tab-panels
                           v-model="tab"
                           animated
                           swipeable
                           vertical
                           style="font-family: Actor"
                           transition-prev="jump-up"
                           transition-next="jump-up"
                         >
                           <q-tab-panel class="no-padding q-my-md" name="credit_card">
                             <div class="col-12 text-h5 text-weight-bold text-center">Fill your card information</div>
                             <div class="col-12 row q-px-lg">
                               <div class="col-10 q-mb-sm">
                                 <label class="text-subtitle1">NAME ON CARD</label>
                                 <q-input class="full-width" outlined v-model="email" color="dark" />
                               </div>
                               <div class="col-10 q-my-sm">
                                 <label class="text-subtitle1">
                                   CARD NUMBER
                                 </label>
                                 <q-input outlined v-model="email" placeholder="0000-0000-0000-0000">
                                   <template v-slot:before>
                                     <q-icon name="payment" />
                                   </template>
                                 </q-input>
                               </div>
                               <div class="col-12 flex justify-between q-my-sm">
                                 <div>
                                   <label class="text-subtitle1">
                                     EXPIRATION
                                   </label>
                                   <div class="flex justify-between">
                                     <div>
                                       <q-input type="number" class="q-mr-md" outlined v-model="email" color="dark" />
                                     </div>
                                     <q-input type="number" outlined v-model="email" color="dark" />
                                   </div>
                                 </div>
                                <div>
                                  <label class="text-subtitle1">
                                    CVV NUMBER
                                  </label>
                                  <q-input class="full-width" placeholder="X X X X" outlined v-model="email" color="dark" />
                                </div>
                               </div>
                             </div>
                           </q-tab-panel>

                           <q-tab-panel name="payPal">
                             <div class="col-12 text-h5 text-weight-bold text-center">Login to Pay Pal</div>
                             <div class="col-12 row q-px-lg">
                               <div class="col-10 q-mx-auto">
                                 <label class="text-subtitle1">User email</label>
                                 <q-input class="full-width" outlined v-model="email" color="dark" />
                               </div>
                               <div class="col-10 q-mx-auto q-mt-sm">
                                 <label class="text-subtitle1">Password</label>
                                 <q-input class="full-width" outlined v-model="email" color="dark" />
                               </div>
                               <div class="col-10 flex q-mx-auto justify-center q-mt-md">
                                 <q-btn label="LOGIN" class="q-px-md"/>
                               </div>
                             </div>
                           </q-tab-panel>

                           <q-tab-panel name="banking">
                             <div class="col-12 text-h5 text-weight-bold text-center">Choose Net banking</div>
                             <div class="col-12 row q-px-lg">
                               <q-radio class="col-6" color="dark" v-model="netBanking" val="agri" label="Agribank" />
                               <q-radio class="col-6" color="dark" v-model="netBanking" val="vietcom" label="Vietcombank" />
                               <q-radio class="col-6" color="dark" v-model="netBanking" val="viettin" label="Viettinbank" />
                               <q-radio class="col-6" color="dark" v-model="netBanking" val="dongA" label="DongAbank" />
                               <q-radio class="col-6" color="dark" v-model="netBanking" val="saigon" label="SaiGonbank" />
                             </div>
                           </q-tab-panel>
                         </q-tab-panels>
                       </template>

                     </q-splitter>
                   </q-item>
                 </q-slide-item>

               </q-list>
             </div>
           </div>
         </div>
       </q-step>

       <template v-slot:navigation>
         <q-stepper-navigation class="flex justify-end">
           <div>
             <q-btn @click="$refs.stepper.next()" color="green-9" :label="step === 3 ? 'Finish' : 'Continue'" />
             <q-btn v-if="step > 2" outline color="dark" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
             <q-btn @click="$emit('closeModal')" outline label="Cancel" class="q-ml-sm" />
           </div>
         </q-stepper-navigation>
       </template>
     </q-stepper>
   </div>
  </div>
</template>

<script>
export default {
  name: "Pay",
  props: {
    dialog: {
      require: true,
      type: Boolean
    }
  },
  data() {
    return {
      step: 2,
      addressEdit: false,
      phoneNumEdit: false,
      nameEdit: false,
      email:'',
      payment: {
        check1: true  ,
        check2: false
      },
      paymentOptions: '',
      tab: 'credit_card',
      splitterModel: 30,
      netBanking: ''
    }
  }
}
</script>

<style scoped>

</style>
