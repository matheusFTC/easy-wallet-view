<template lang="pug">
v-container(fluid)
  v-layout(align-start justify-center)
    v-flex(md10 xs12)
      template
        header.page-header
          v-btn(@click="goBack" icon): v-icon arrow_back
          h2.page-title {{ record._id ? 'Atualizar funcionário' : 'Novo funcionário'}}
        v-form(ref="form" v-model="valid")
          v-text-field(v-model="record.referenceCode" label="Cód. referência")
          v-text-field(v-model="record.name" label="Nome")
          v-text-field(v-model="record.email" label="Email" type="email")
          v-text-field(v-if="enablePassword" v-model="record.password" label="Senha" type="password")
          v-menu(ref="menuDateOfBirth"
            :close-on-content-click="false"
            v-model="menuDateOfBirth"
            :nudge-right="40"
            :return-value.sync="record.dateOfBirth"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px")
            v-text-field(slot="activator"
              v-model="record.dateOfBirthFormatted"
              label="Data de nascimento"
              prepend-icon="event"
              readonly)
            v-date-picker(v-model="record.dateOfBirth" @input="formatDateOfBirth()" no-title scrollable locale="pt-br")
              v-spacer
              v-btn(flat color="primary" @click="menuDateOfBirth = false") Cancelar
              v-btn(flat color="primary" @click="$refs.menuDateOfBirth.save(record.dateOfBirth)") Selecionar
          v-text-field(v-model="record.nif" label="CPF" type="text" mask="nnn.nnn.nnn-nn")
          v-text-field(v-model="record.generalRegistration" label="RG" type="text")
          v-text-field(v-model="record.workRegisterBooklet" label="CTPS" type="text")
          v-menu(ref="menuAdmissionAt"
            :close-on-content-click="false"
            v-model="menuAdmissionAt"
            :nudge-right="40"
            :return-value.sync="record.admissionAt"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px")
            v-text-field(slot="activator"
              v-model="record.admissionAtFormatted"
              label="Data de admissão"
              prepend-icon="event"
              readonly)
            v-date-picker(v-model="record.admissionAt" @input="formatAdmissionAt()" no-title scrollable locale="pt-br")
              v-spacer
              v-btn(flat color="primary" @click="menuAdmissionAt = false") Cancelar
              v-btn(flat color="primary" @click="$refs.menuAdmissionAt.save(record.admissionAt)") Selecionar
          v-menu(ref="menuResignationAt"
            :close-on-content-click="false"
            v-model="menuResignationAt"
            :nudge-right="40"
            :return-value.sync="record.resignationAt"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px")
            v-text-field(slot="activator"
              v-model="record.resignationAtFormatted"
              label="Data de demissão"
              prepend-icon="event"
              readonly)
            v-date-picker(v-model="record.resignationAt" @input="formatResignationAt()" no-title scrollable locale="pt-br")
              v-spacer
              v-btn(flat color="primary" @click="menuResignationAt = false") Cancelar
              v-btn(flat color="primary" @click="$refs.menuResignationAt.save(record.resignationAt)") Selecionar
          v-text-field(v-model="record.place" label="Logradouro" type="text")
          v-text-field(v-model="record.number" label="Número" type="text")
          v-text-field(v-model="record.complement" label="Complemento" type="text")
          v-text-field(v-model="record.reference" label="Referência" type="text")
          v-text-field(v-model="record.neighborhood" label="Bairro" type="text")
          v-text-field(v-model="record.state" label="Estado" type="text")
          v-text-field(v-model="record.city" label="Cidade" type="text")
          v-text-field(v-model="record.zipCode" label="CEP" type="text" mask="nnnnn-nnn")
          v-text-field(v-model="record.country" label="País" type="text")
          v-text-field(v-model="record.phone" label="Telefone" type="text" mask="(nn) nnnnn-nnnn")
          v-checkbox(:disabled="!isManager" v-model="record.isManager" label="Funcionário com papel gerencial?")
          v-textarea(v-model="record.note" label="Observação")
          v-checkbox(v-model="record.isEnabled" label="Habilitado para acesso ao sistema?")
          h3(v-if="enableNewPassword") Alterar senha
          v-text-field(v-if="enableNewPassword" v-model="record.password" label="Senha atual" type="password")
          v-text-field(v-if="enableNewPassword" v-model="record.newPassword" label="Nova senha" type="password")
          v-text-field(v-if="enableNewPassword" v-model="record.newPasswordConfirm" label="Confirmação da nova senha" type="password")
          v-btn(color="primary"
            :disabled="!valid"
            @click="submit") salvar
          v-btn(color="error"
            v-if="record._id"
            :disabled="!isManager"
            @click="remove") Excluir
          v-btn(color="error"
            @click="clear"
            v-if="!record._id") limpar
</template>

<script lang="ts" src="./user-create-update.ts">
</script>

<style lang="stylus" scoped>
</style>