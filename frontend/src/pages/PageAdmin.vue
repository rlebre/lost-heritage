<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <template v-if="posts">
          <q-table
            :data="posts"
            :columns="columns"
            row-key="index"
            :pagination.sync="pagination"
          >
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn
                  dense
                  round
                  flat
                  color="grey"
                  icon="edit"
                  disabled
                ></q-btn>
                <q-btn
                  dense
                  round
                  flat
                  color="grey"
                  icon="delete"
                  disabled
                ></q-btn>
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="send"
                  @click="insertTestData(props)"
                />
              </q-td>
            </template>
          </q-table>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PageAdmin',

  data() {
    return {
      pagination: {
        rowsPerPage: 8
      },
      columns: [
        {
          name: 'contributorName',
          label: 'Contributor',
          field: 'contributorName',
          sortable: true,
          align: 'left'
        },
        {
          name: 'title',
          label: 'Title',
          field: 'title',
          align: 'left',
          sortable: true
        },
        {
          name: 'county',
          label: 'County',
          field: 'county',
          align: 'left',
          sortable: true
        },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      posts: [
        {
          contributorName: 'test',
          contributorEmail: 'ruilebre@ua.pt',
          contributorCity: 'Aveiro',
          title: 'VAL 01 - Loja do cidadão de Valpaços',
          details: 'Antiga escola primária, atual Loja do Cidadão',
          county: 'Valongo',
          lat: 41.6086699,
          lng: -7.3086866,
          isRecovered: 'true',
          images: [
            'https://doc-0k-3g-mymaps.googleusercontent.com/untrusted/hostedimage/f43t6g193rpome942fbb5p33o0/t4sukf02he16e95mv5ib0omn60/1601306684250/rmcLTOFWumzQ1ioJZyBYs-IBGDnsECMi/11758957615189730058/5AF2TALpxZCKnlUkjWPx05rQS9k2wpuTWJ1I-qULaMv_TItCt7rMmQ7jzsCsXz43TlhRP6jazmtDRNhfMkXM6TKE3YqjpvgarLK94EpNvZou99Dl2FGbfl3GwetB4b_yrfhRyHh9AKAvTsXAwOt_2jz9HUPRQr-8qCoEj84QoCi-0etfu6pEVAgrV_vIocThRQZtsdBwmeo3bNH9Lklrpof9yuj8vX3cXCVbhmbfLm4NLiPvCr4RzSFepzeDV9gHczDA_09JwYPL85S17OczM7sc1XaBtMU84gg?session=0&fife=s16383',
            'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAACVf_yUL9_iegBYRYtOe5zJH2y8HmXkFYMX-KTlGgu8weONQhASsm8l8ihIaJdFAJUH7hFMQa-SJcuj8g4l_Yzlvh66h1Z5dtm7GJSGZzTLI5wBO1UcseR_wJRDRJNZ68EhBNOew8nBF1jvgZumdBIPybGhQULO9PW3tQOzvDPUKIaaj4MKIDsg&4u16383&5m1&2e1&callback=none&client=google-maps-pro&token=12301',
            'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAATQL96rD4VA9R6_WhYmb_DRQ2EH00b6CpDSVF4NQ18dRDPmV5b53im1GzuTpgp-jAnSv1hmihoskXLBTI57fn8RGy2XbdKI3aAPZrYZf6eLR6tthaJdglLl0CrP3d_iaJEhCKsK_0GWXApn9J-IAgiVlCGhS5163UUxOwoc9w8GRaJo9KjwYx5w&4u16383&5m1&2e1&callback=none&client=google-maps-pro&token=101032'
          ]
        },
        {
          contributorName: 'test',
          contributorEmail: 'ruilebre@ua.pt',
          contributorCity: 'Aveiro',
          county: 'Coimbra',
          title:
            'COI 01 - Escola do Brinquedo Tradicional Popular (antiga escola)',
          images: [
            'http://cdn.simplesite.com/i/cd/8a/282319406261635789/i282319414685595387._szw1280h1280_.jpg'
          ],
          details:
            'Proprietário atual: Associação Desportiva e Recreativa do Loureiro Rua Canto da Rua - Loureiro 3040-787 Cernache. Enviado por: Associação Desportiva e Recreativa do Loureiro (A.D.R.L.) http://www.adrloureiro.com/ e https://www.facebook.com/escolabrinquedotradicionalpopular ',
          isRecovered: true,
          lat: 40.1323652,
          lng: -8.4415859
        },
        {
          contributorName: 'test',
          contributorEmail: 'ruilebre@ua.pt',
          contributorCity: 'Aveiro',
          county: 'Vagos',
          isRecovered: false,
          details:
            'Enviado por: Claudia Almeida. Imagem: Rui botelho (https://olhares.com/o-convento-que-ja-foi-foto1486583.html) Informações: https://www.e-cultura.pt/patrimonio_item/5502',
          lat: 40.5642549,
          images: [
            'https://doc-08-3g-mymaps.googleusercontent.com/untrusted/hostedimage/f43t6g193rpome942fbb5p33o0/fujj719ce40s4ogv53n6lu894k/1601306684250/rmcLTOFWumzQ1ioJZyBYs-IBGDnsECMi/11758957615189730058/5AF2TALr3K7gUX4ki2wQ1nq92h8qW5v-1UwJqHnY5mJT1v8Q5ZYcJ2Sg9SjT-V7vCl4BqkvQBBTR6uLOtFiP6LtkOLAclzc3oLaZXUiNDAyFiS3iRFz6h516ygPgMZpIhJ3qWn8pqXAWiuvKKu1WWqk7rwbluFnFlJXwkwDPblj6_eBHcyA_bFsYvsMkxHnVHaZL5YzO3Gqs6zTp5x5qiBZo7EQru6Ec_ogN2yZbaBPVzm7veXcIBAdKIOG9oVcqbvNRfeBdG6fKBKJOD6HFb7eghD2ppB_xfNA?session=0&fife=s16383'
          ],
          title: 'VAG 02 - Antigo Convento da Pedricosa',
          lng: -8.6718067
        },
        {
          contributorName: 'test',
          contributorEmail: 'ruilebre@ua.pt',
          contributorCity: 'Aveiro',
          county: 'Vagos',
          details:
            'Antiga escola primária, em ruínas. rua da Barreira, Salgueiro, Vagos. Enviado por: Claudia Almeida. ',
          location: 'VAG 01 - Escola Velha',
          images: [
            'https://doc-0k-3g-mymaps.googleusercontent.com/untrusted/hostedimage/f43t6g193rpome942fbb5p33o0/nppkbmn2skr8n1f93mjfg4bf7k/1601306684250/rmcLTOFWumzQ1ioJZyBYs-IBGDnsECMi/11758957615189730058/5AF2TALqKMtfadDJUdzpmzDvqdn0jXiHoMir1KOO-LB3uG79SDYd2VxKSb5zYIJZlPHeaplekyEQxjiSxdRtiZF6Pa_F1v130Cmm8ptuSNzJqoEu66UKUT7jiUvl9zt3IarNdhLm53axj5M987OIaxdfkb1HMRCA0-IEiCupdey1bmKENL53fCntmSJdk0BsreD3r3h2IfHA2UypogwQ8J1Q0f6algalaXtxH3cPI2eClcoJ1oiKsUHpo7Y4HahUp4cuw3THbo3UlAEkRSnCmCYZtOw_F_tWogQ?session=0&fife=s16383'
          ],
          lng: -8.6216889,
          title: 'VAG 01 - Escola Velha',
          isRecovered: false,
          lat: 40.5628528
        },
        {
          contributorName: 'test',
          contributorEmail: 'ruilebre@ua.pt',
          contributorCity: 'Aveiro',
          county: 'Albergaria-a-Velha',
          details: 'ALB1 - Estação C.F. de Albergaria-a-Nova',
          isRecovered: false,
          lng: -8.4917088,
          title: 'ALB1 - Estação C.F. de Albergaria-a-Nova',
          lat: 40.7443783,
          images: [
            'https://firebasestorage.googleapis.com/v0/b/forgotten-heritage-dev.appspot.com/o/2017-05-16.jpg?alt=media&token=8b42e392-2270-4be8-9dc9-a2211b39e589'
          ]
        },
        {
          contributorName: 'test',
          contributorEmail: 'ruilebre@ua.pt',
          contributorCity: 'Aveiro',
          county: 'Coimbra',
          isRecovered: false,
          details:
            'Antigo hospital pediátrico de Coimbra, propriedade da Câmara Municipal de Coimbra. Imagem:Gustavo Simões (viaGoogle). Enviado por H. Carmona da Mota',
          title: 'COI 01 - Antigo Hospital Pediátrico de Coimbra',
          lng: -8.413004,
          lat: 40.215743,
          newsletterAgree: true,
          images: [
            'https://doc-0g-3g-mymaps.googleusercontent.com/untrusted/hostedimage/f43t6g193rpome942fbb5p33o0/p027j9r1cketv6jtrli0ga9jf4/1601306684250/rmcLTOFWumzQ1ioJZyBYs-IBGDnsECMi/11758957615189730058/5AF2TALrZTKsldL_htw7gmY4Z2P8NaVIWvahKee3IXdo_lNTLTknSOxE7T8GtdYdb1XfUEHdFAQOJaRnEK8b9PWa4c17OU8nYYNrhcT_2iBRM8vPjF4pa-wWMMfrTR1W0iikWTqg8tfWRAJqzNvc9QWn6d9mke6gGR035ns4dY60gVTRrzcbVW4Kg3SUGvv33FAu4SuzEwyDT3QY_jZvLjbE2hgdHPyhIJFKIa6BZhFAJk5BME_mhVmxzlAm3wa_9qmJc9jBLooBlpM42YApsr_H1Cl1cnwYjoQ?session=0&fife=s16383',
            'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAVnVvCyTXueYp850u9s4O_BCinw1-kE5DZ0h5GbUfZah08Buu5MuB92DPFBj7rFyrkVyuigrv_-ulI-hNGPLeXQ2r-fs4Ki25EhpFcnUwBWbW8616uQzyAEhH9rKzNF5OEhB3wB89xWOguAmU-FRqUtjOGhRkGtOkqde4MJWQPunbTq2K3rBnYA&4u16383&5m1&2e1&callback=none&client=google-maps-pro&token=80024',
            'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAXYENoBbEOb0QZs9M7Qc_shzl5o5XreanG1HPYqdPIvxoBwGyBJE5AeLAhLytfZRNWpwXfcR9iigA26pA7K20CggZCJB7j0F2NFsPZSmb1y410Q4qkw-r1mlUW3AOEVRxEhAiugg97B40LxqUKOCDlbmMGhQ8816oLhs_IyB-PuP6o4qZo0Gdeg&4u16383&5m1&2e1&callback=none&client=google-maps-pro&token=44983'
          ]
        }
      ]
    };
  },

  methods: {
    ...mapActions('posts', ['createPost']),

    insertTestData(props) {
      this.createPost(props.row);
    }
  }
};
</script>
