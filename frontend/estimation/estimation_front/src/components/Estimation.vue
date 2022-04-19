<script setup lang="ts">
import Materials from './Materials.vue'
import { ref, computed, onMounted, Ref } from 'vue'
import { useGrid } from 'vue-screen'
import { useStore as useStoneStorage } from '../store/stones';
import { Stone } from '../interfaces';

const grid = useGrid('tailwind')

const currentTab = ref('материал')

const stoneStorage = useStoneStorage()

const tabToStorage = {
    материал: stoneStorage
}

const store = computed(() => {
    return tabToStorage[currentTab.value]
})


const control_buttons = computed(() => {
    const buttons = []
    if (!grid.md) {
        buttons.push({
            title: 'Итог',
            action: 'foo'
        })
    }
    if (currentTab.value == 'изделие') {
        buttons.push({
            title: `Добавить ${currentTab.value} `,
            action: addCard
        })
    }

    return buttons
})

const calculationBlock = ref()
const control_buttons_w = ref()
onMounted(() => {
    control_buttons_w.value = calculationBlock.value.clientWidth + 'px'
    addEventListener('resize', e => {
        control_buttons_w.value = calculationBlock.value.clientWidth + 'px'
    }, true)
})

const addCard = () => {
    store.value.addCard()
}

</script>

<template>
    <div class="md:container md:mx-auto mt-10 flex flex-col gap-2 font-sans antialiased">
        <div class="controls ring-1 p-2 mx-1 md:mx-0 rounded-lg">menu</div>
        <div class="md:flex flex-row gap-3">
            <div ref="calculationBlock" class="calculation_block basis-11/12 w-full mb-[68px]">
                <el-tabs tab-position="top" v-model="currentTab" stretch="true">
                    <el-tab-pane name="материал" label="Материал">
                        <materials></materials>
                    </el-tab-pane>
                    <el-tab-pane name="изделие" label="Изделие">Lorem ipsum dolor sit amet consectetur adipisicing
                        elit.
                        Quidem tempora perspiciatis quis ex deleniti. Ad, facilis veniam. Aliquam veniam quo facere
                        qui
                        doloremque, mollitia obcaecati aliquid quaerat totam ex sequi ab distinctio autem ut
                        explicabo
                        ipsam ducimus atque esse corrupti natus modi, fugiat nisi facilis! Consequatur temporibus
                        perspiciatis asperiores aperiam molestiae? Mollitia voluptatibus, iure sapiente velit quis
                        vel
                        consequatur aspernatur ducimus obcaecati repellat labore inventore expedita a id officia et
                        rerum quos aut in nostrum incidunt, soluta error consectetur! Cupiditate laboriosam id,
                        sint,
                        impedit magnam quos molestias illo vel dolor ullam deleniti earum? Quisquam culpa cumque
                        voluptas assumenda ratione fugit vitae non sapiente quis labore sequi officiis obcaecati
                        enim
                        tempore fugiat dolore perspiciatis reprehenderit, dolor vero error illo voluptatibus
                        explicabo.
                        Quis harum voluptate facere ex aspernatur quibusdam, deleniti quae aut adipisci quaerat
                        ratione
                        voluptas veniam vitae magni veritatis esse totam. Similique nisi, consequatur quis, soluta
                        beatae, culpa nihil commodi iure repellendus accusantium tenetur! Voluptates repellendus
                        corporis, quos animi tempore at id? Tenetur, libero. Alias veniam sequi earum odit libero
                        quia
                        dolores explicabo perspiciatis a illo officiis, numquam placeat, debitis laudantium sunt
                        praesentium! Dolorem tempora cumque tenetur repellat unde quas excepturi error ut. Atque eos
                        perferendis, sit voluptas voluptatem similique itaque reiciendis incidunt ducimus suscipit
                        enim
                        cum sint quidem porro ex vitae, placeat molestias laboriosam in quos eligendi numquam odit
                        odio!
                        Nulla itaque vel quia consectetur, magnam dolores iste consequatur eum rem earum, soluta
                        officiis, culpa esse. Voluptate perferendis consectetur nobis, hic nam eius alias? Maxime
                        repellendus nostrum dolore? Voluptatibus quaerat commodi consequatur voluptatum sit
                        obcaecati
                        quidem ratione cumque delectus modi ex, deleniti earum hic! Iste, velit id, similique
                        commodi
                        nobis incidunt tenetur illum dolores, veritatis debitis quo in deserunt reprehenderit quis
                        nisi
                        minus aliquid deleniti sapiente iure exercitationem repellat sed. Aut veniam commodi
                        officia,
                        eligendi repellendus sit maiores asperiores velit modi voluptate illo iure aspernatur
                        explicabo
                        necessitatibus qui culpa repudiandae non fuga nemo dicta optio repellat? Est at
                        necessitatibus
                        rem quo? Excepturi, quos! Eum minus, tempore odit ab totam deserunt iste. Optio expedita
                        similique ipsa ut commodi, officiis qui sunt minima ipsum, corrupti illum cum doloremque
                        quos.
                        Cumque asperiores cupiditate obcaecati vero deserunt! Placeat facilis assumenda sapiente
                        quibusdam perferendis aut tempora? Dolorum doloribus rem excepturi cupiditate mollitia?
                        Consequatur ut voluptate aliquam ipsum dolore accusamus facere temporibus deserunt
                        dignissimos
                        possimus fugit doloribus sit minima tempore aperiam voluptas, architecto ex excepturi animi
                        veniam? Nihil, placeat facere! Quo minima facere, sed neque cum suscipit voluptas iste
                        praesentium fuga explicabo consequuntur unde error. Obcaecati dolor architecto nostrum porro
                        consectetur nesciunt id similique eos nihil quos? Error laborum, facilis eos quibusdam ex
                        amet
                        placeat provident in ab! Facilis rem optio debitis repudiandae omnis, veniam recusandae
                        labore
                        et eius aperiam perspiciatis cupiditate ut, minima, inventore tenetur voluptate! Voluptates
                        quos
                        aperiam laborum illum impedit culpa quod, at in vero assumenda vel repudiandae, mollitia
                        ipsa
                        aliquam nemo deserunt voluptatibus temporibus cupiditate inventore soluta. Provident
                        eligendi
                        alias harum, dicta cupiditate est odit nemo. In accusantium voluptates quo inventore ad fuga
                        recusandae nihil vel? Velit facere incidunt a. Corrupti est praesentium quam eos, numquam
                        veniam
                        autem quod minus nulla rerum quae possimus ducimus sunt labore fugiat enim debitis vel
                        voluptatum at pariatur aliquam porro? Aperiam officia maxime repudiandae vel totam eveniet,
                        molestias nihil earum, accusamus exercitationem nulla, eligendi consequatur minima quis
                        recusandae numquam libero ex voluptate. Nulla commodi aspernatur quod facere nobis voluptate
                        voluptatum dolore nemo provident quos. Atque harum molestiae quisquam? Nostrum ex
                        repudiandae
                        earum doloribus laborum quod, a modi, fuga, aut dolore quam necessitatibus alias labore odit
                        tempora. Iste dolores delectus doloremque a tempore exercitationem impedit amet consequatur
                        ducimus accusantium, rerum, aut temporibus qui quod facere, ratione reiciendis expedita
                        itaque
                        cumque vel voluptate nesciunt laborum provident dolore. Voluptate ea doloribus magni
                        necessitatibus eum amet aliquam dolorum quasi quo expedita libero illum ratione dolores,
                        quaerat
                        eos neque molestiae voluptatem, inventore iste distinctio possimus quae? Est impedit ea
                        fugiat
                        laborum nisi ex a dolorum illum quidem dicta quos in consectetur ullam, autem quas.
                        Perspiciatis
                        accusantium odit ut facere doloremque exercitationem? Consequuntur error quis similique
                        cumque,
                        eveniet esse veritatis explicabo obcaecati doloribus placeat dolor accusamus laboriosam non.
                        Ex
                        ullam libero asperiores recusandae necessitatibus iusto beatae minus sunt? Architecto
                        expedita
                        eos velit animi in natus at atque explicabo nisi cumque obcaecati voluptate, laudantium
                        facere,
                        autem labore assumenda eligendi. Natus minus sapiente cupiditate, ipsam placeat incidunt.
                        Cumque
                        dolores autem fugit odit, quidem hic necessitatibus sunt aliquid optio repellendus nam,
                        nihil
                        dolore facere quo voluptas vitae dignissimos obcaecati iure. Voluptatum distinctio fugiat
                        similique debitis iste exercitationem est ipsam optio quidem? Consectetur aliquam magnam
                        numquam
                        earum beatae! Libero repellat ipsum possimus non obcaecati, eligendi quo eos dignissimos id
                        dolores exercitationem ratione? In quibusdam ipsam quaerat libero adipisci fuga, natus
                        voluptate
                        veritatis expedita! Deleniti maiores sunt rerum illo fugit! Quasi soluta, animi voluptatem
                        deleniti quae aspernatur rerum ad exercitationem nostrum iste illum magnam itaque dicta
                        sapiente
                        fugit ut asperiores mollitia consequatur dolore placeat alias veritatis quis odio
                        reiciendis!
                        Necessitatibus doloremque architecto sed. Earum, odio minima voluptates eius ratione atque
                        laudantium doloribus beatae porro eligendi excepturi nostrum eos consequuntur harum
                        explicabo
                        expedita esse aspernatur. Reprehenderit nemo eius optio delectus, esse quaerat quam modi
                        distinctio ab quisquam totam rerum explicabo obcaecati quod adipisci doloribus eum.
                        Repudiandae
                        veniam, eius tempore doloribus modi pariatur recusandae rem, accusamus ad molestiae
                        reprehenderit consectetur corporis beatae quia odio. Reiciendis architecto, aut nihil
                        fugiat,
                        expedita tempore enim dolorum veniam quos quidem esse atque temporibus tenetur, nulla quo
                        quis
                        unde. Aliquam incidunt rerum minima dicta nobis odit voluptatibus itaque doloribus ut id
                        inventore repellendus architecto, suscipit est quasi aspernatur! Quae accusantium quis
                        omnis,
                        cumque at odit reiciendis minima voluptate minus, odio similique perferendis hic aliquam
                        corporis veniam voluptas mollitia vitae quibusdam ipsam voluptatum quas repellendus
                        deleniti!
                        Adipisci officia pariatur quisquam porro vero error delectus quos, magni quod cupiditate
                        iusto
                        maiores maxime? Sunt, molestiae ex. Explicabo quisquam provident, quidem et labore eveniet
                        necessitatibus corporis maxime eligendi neque ipsum laboriosam quae quo mollitia totam
                        cupiditate ut error? Minus quisquam dolores, fugit sed iure enim aliquam? Cum debitis, illum
                        obcaecati dolore aut necessitatibus aliquam accusamus aliquid officia nulla sint inventore
                        sit
                        eius sapiente adipisci eum corporis? Magnam quia delectus impedit quam aliquam? Soluta
                        veniam
                        facilis porro accusantium. Dignissimos minima asperiores id molestias animi quos cumque sit
                        harum sequi. Velit, vero nisi. Iste omnis, harum quaerat veniam porro nulla excepturi illum
                        eum,
                        molestias at, voluptatum incidunt numquam molestiae cum exercitationem? Maiores natus
                        aliquam
                        consequuntur eaque tempora? Excepturi suscipit assumenda adipisci eos autem doloribus,
                        recusandae dolores esse laborum! Alias et error illum, delectus eius aspernatur amet.
                        Voluptate,
                        esse delectus. Omnis molestiae velit ea eum atque unde modi, excepturi explicabo odio beatae
                        rerum tempora itaque quos rem ducimus delectus laborum dicta cupiditate non! Nam minima,
                        quia
                        officiis dolor quam ab animi reiciendis, ducimus quidem qui iusto vel, voluptatem illum
                        ullam
                        omnis fugiat odio consequuntur maiores ea iure! Eius soluta quam voluptate amet, quod a
                        sapiente
                        tempore modi inventore laudantium voluptatum ab architecto sequi quis velit fugit animi quia
                        quasi dignissimos! Aliquam sapiente fugiat porro, enim eligendi, veniam inventore cum optio
                        fugit totam, voluptatum ullam dolore autem ea. Praesentium dolorum illum deserunt asperiores
                        ullam quidem doloremque libero delectus perferendis soluta, impedit cum distinctio
                        laudantium.
                        Quam voluptatibus molestiae minima suscipit natus explicabo odit vero. Nobis quisquam rem
                        labore
                        assumenda deserunt expedita incidunt voluptates facilis quos iusto, aspernatur, sint
                        corrupti!
                        Doloremque fugiat nesciunt cum praesentium impedit a laborum nihil fugit id, perferendis
                        voluptatem sint, neque quasi non expedita temporibus eligendi facere quod ducimus aliquam
                        repellendus asperiores excepturi ad! Harum ipsam, provident debitis fugiat quia et
                        repellendus.
                        Dolorum, quia obcaecati aspernatur ut, harum alias enim, quas perspiciatis animi quasi
                        maxime
                        soluta assumenda voluptates unde sint iste tempora facilis eaque rerum cumque doloribus
                        voluptas! Ullam iure, numquam sit enim doloremque earum, similique culpa a expedita debitis
                        dolores quaerat qui possimus voluptatibus ad obcaecati placeat? Quos quisquam itaque
                        corporis ut
                        earum reprehenderit fuga nemo aliquam dolorem repudiandae quis possimus corrupti repellat,
                        sapiente facilis officiis harum culpa est incidunt assumenda iusto eos commodi dolor
                        excepturi.
                        Delectus distinctio suscipit officiis facilis accusantium, quaerat explicabo ut dolor ipsa
                        accusamus mollitia ducimus necessitatibus assumenda quos debitis nam numquam veritatis earum
                        porro incidunt tenetur! Autem alias commodi corrupti dicta saepe ipsa nam. Ex, molestiae!
                        Reiciendis incidunt, sit maiores quis, omnis quam ipsa officia laborum cupiditate
                        perspiciatis
                        quo fugit blanditiis excepturi libero, aliquid recusandae facilis nemo. Distinctio nostrum
                        consequatur aut, harum placeat vero, aliquid quidem, quos suscipit architecto deserunt
                        autem!
                        Aliquid in animi ut illum placeat vel aut at facere fuga alias? Incidunt, tempora
                        dignissimos
                        debitis illo voluptate fugiat nam culpa reprehenderit. Eligendi, ullam, ea quaerat veritatis
                        temporibus in voluptatem amet debitis earum nobis placeat. Ipsam neque a suscipit veritatis.
                        Sapiente vitae explicabo officia mollitia sit? Placeat voluptatum officia quaerat, labore
                        laboriosam magni iure aliquam similique, pariatur in vitae sint nobis molestias quae nihil,
                        maiores eius inventore impedit natus illo deleniti saepe! Dolore, eligendi eius debitis
                        adipisci
                        repellat nobis doloribus tenetur dolorem incidunt facilis provident eveniet reiciendis, iure
                        eaque tempore aut ab blanditiis sunt id laudantium odit non veniam? Vitae, recusandae
                        necessitatibus aspernatur excepturi modi reiciendis corporis repudiandae quae enim ab saepe
                        voluptatem fugiat accusantium ipsam minima temporibus culpa vel nesciunt voluptates quod
                        animi
                        et dolore nobis possimus? Possimus nemo dolores vero repellendus quasi dolore. Officiis iure
                        nam
                        blanditiis aliquam et consectetur distinctio modi magnam incidunt vero voluptate ipsa omnis
                        a,
                        vitae voluptatum ipsam eum iusto! Possimus dignissimos quos natus necessitatibus earum
                        voluptates totam, error maiores magnam ratione harum quo tempore nihil aperiam hic nobis
                        numquam
                        odio sequi laudantium similique expedita. Iste eius consequuntur illum nemo animi ipsam fuga
                        in
                        excepturi deserunt dolor! Rerum iusto minima voluptas illo officia incidunt ipsam maxime sit
                        maiores cum, alias explicabo a. Quos voluptatum maiores sapiente animi aliquam? Explicabo
                        nobis,
                        error rem, sapiente et, accusantium minus illo corporis laborum eum voluptate. Maxime amet
                        hic
                        necessitatibus veritatis quos ratione totam fugit debitis, incidunt eveniet praesentium
                        cumque
                        quis accusantium minima ipsa quia facere repellat vel consectetur et voluptatibus obcaecati
                        pariatur consequatur. Atque recusandae corrupti porro corporis consectetur eius voluptatum
                        ullam, esse cum soluta magni reprehenderit optio labore, voluptas quam enim cumque in modi
                        architecto maiores. Maxime, earum mollitia consequuntur aliquid architecto accusantium
                        accusamus
                        nostrum iure iste placeat, nobis itaque. In laboriosam delectus praesentium architecto
                        consequatur. Repellendus pariatur impedit assumenda. Porro quaerat quo eaque ducimus
                        officiis
                        fugit quos harum assumenda quidem tempora labore, libero exercitationem necessitatibus
                        incidunt
                        obcaecati sint dignissimos, fugiat laboriosam adipisci dolor alias. Possimus earum, odio
                        itaque
                        autem veritatis dolorum iusto magnam labore qui non dicta neque voluptas dolores, quo sunt
                        atque
                        impedit adipisci nulla modi. Cupiditate molestiae harum quidem possimus culpa tenetur hic
                        officia? Quidem saepe quae expedita, consequuntur officia deserunt facere inventore vitae,
                        laborum ex sapiente dolor corrupti quasi rerum suscipit aperiam non id illo, excepturi nemo
                        debitis. Excepturi fuga rem eum aspernatur laborum cumque voluptate, voluptates cupiditate
                        dolore quod, officiis harum sint assumenda blanditiis molestiae praesentium consequuntur
                        magnam
                        obcaecati minima saepe. Eligendi odit modi repudiandae mollitia eius placeat iusto cumque
                        magnam
                        doloribus, similique natus eos voluptate earum qui nisi a consectetur dignissimos cupiditate
                        adipisci. Iste tenetur sapiente aliquam? Pariatur, mollitia fuga. Facere rem numquam quae,
                        iusto
                        deleniti illum explicabo a sapiente quasi est minus, vitae iste. Obcaecati vitae consequatur
                        et
                        expedita perferendis. Enim neque beatae vero repellat expedita molestiae excepturi nam,
                        vitae ea
                        eum id accusantium recusandae fugiat fugit rerum temporibus aspernatur iste. Eveniet dolorum
                        eum
                        debitis tempore ratione nulla dolores asperiores dicta hic laborum, nihil corporis, eius
                        nemo
                        ea? Odit ipsam velit consectetur minus, sequi aut necessitatibus hic, debitis alias aliquid
                        deleniti distinctio accusamus tenetur non dolor eveniet voluptas libero odio magnam suscipit
                        cumque aperiam dicta porro? Nam nostrum labore voluptatem dolores sint officiis voluptate
                        illum
                        eaque placeat nemo quam nobis modi eligendi laborum, recusandae ipsam at molestias expedita
                        numquam! Consequuntur culpa itaque voluptate eos vitae eveniet voluptatem, enim delectus
                        placeat. Neque maiores ratione, facilis repudiandae corporis commodi magnam voluptatum
                        facere
                        aut provident ducimus voluptates debitis asperiores, perferendis minus ex optio sunt eius,
                        atque
                        quaerat quae corrupti ut minima! Vero molestias quia, atque ut vel perferendis totam
                        sapiente
                        quae natus doloremque dolor excepturi odit placeat. Soluta saepe vero, ex molestias
                        mollitia,
                        facere, totam temporibus itaque quaerat voluptate optio! Vel neque sit libero ex minima,
                        soluta
                        aperiam tempore numquam necessitatibus. Dignissimos necessitatibus tenetur inventore?
                        Tempore
                        pariatur facilis quam necessitatibus repellat reiciendis dicta, temporibus nulla! Rem, non
                        illum
                        placeat a sint quis cupiditate recusandae alias sunt est error magni sequi dolorum commodi
                        corrupti ullam praesentium! Exercitationem dolorem repellendus illum nesciunt, iure
                        veritatis
                        dolor quibusdam, sed nisi quod fuga omnis consequuntur repellat amet tenetur quae, placeat
                        esse
                        magnam corrupti? Ipsa natus est commodi. Tenetur, libero neque magni aliquid quidem est
                        necessitatibus perspiciatis cum assumenda ratione rem repudiandae voluptatibus. Tenetur
                        quaerat
                        suscipit inventore quam quasi quia? Sed nobis aut magni sint perspiciatis ex, vitae
                        distinctio
                        suscipit rerum quaerat, consequatur labore, consequuntur nihil. Corporis, dicta minus
                        laborum
                        perspiciatis delectus quibusdam error. Ab sequi natus consequatur nemo doloribus blanditiis
                        hic
                        cumque consequuntur corrupti laboriosam quibusdam, illo ducimus nobis vitae sint quas atque
                        voluptas. Quam molestiae nam, quia repellendus quibusdam quod sequi accusamus culpa magni
                        corporis, voluptate, ab dignissimos. Minus eveniet repudiandae dolor quibusdam numquam
                        accusantium culpa unde, deleniti aliquid vel, blanditiis rem fuga vitae, officia excepturi?
                        Consequuntur, vel nulla ipsa explicabo nam molestias id necessitatibus quisquam corrupti
                        saepe
                        rem veritatis, dolor quas pariatur blanditiis veniam doloremque rerum animi sint vero
                        repudiandae optio. Reiciendis suscipit autem veritatis sapiente voluptatum ipsa aliquam.
                        Labore
                        perspiciatis dolorum quia qui rerum cum repellat! Earum omnis similique labore beatae
                        dolorem?
                        Maxime nesciunt animi corrupti nulla odit facilis mollitia quos deleniti eveniet aperiam,
                        voluptatum qui corporis molestiae iure labore quis! Nulla consectetur, pariatur eius quas
                        perspiciatis minima veniam velit provident? Sed, accusantium illum! Quos quasi dolorem,
                        sapiente
                        minima perferendis error pariatur deserunt dolores vitae modi nemo hic officiis sed
                        recusandae
                        eveniet, ex expedita dolore numquam in officia. Optio eos voluptates neque commodi nihil ab
                        magni impedit reprehenderit provident dignissimos debitis, harum minima. Nisi minima
                        praesentium
                        ducimus quia nam molestias esse voluptas architecto a aut. Culpa, ducimus dolores earum sed
                        ipsa
                        unde amet cumque tempora, incidunt eius placeat doloremque quas, repellendus repudiandae
                        reiciendis saepe non! Atque delectus ullam consequatur esse deleniti dolores hic
                        perspiciatis
                        vitae dolor, debitis consequuntur! Eligendi vitae at rem atque magnam distinctio quae
                        corrupti
                        praesentium eius et ullam perferendis, minus maxime similique! Maiores, ipsa assumenda
                        ratione
                        laboriosam velit autem voluptates facilis necessitatibus, voluptate voluptatum possimus
                        inventore eos id corporis! Eos qui ex blanditiis, quaerat necessitatibus voluptatibus
                        adipisci
                        quisquam quis dolores! Necessitatibus optio temporibus vitae consectetur illum deserunt
                        eveniet
                        laborum. Autem, quo eaque, quam accusamus similique maxime possimus quidem aspernatur
                        voluptatibus illo explicabo reprehenderit neque fugiat? Commodi facere libero inventore quo
                        illo
                        alias repellendus odit nisi, aut non nemo quis ad, itaque temporibus, quibusdam
                        exercitationem
                        similique impedit et consequuntur odio eum excepturi dolor repudiandae. Ab a minima
                        molestias
                        corporis mollitia recusandae placeat ratione quam, itaque repudiandae laborum, qui sit
                        tenetur
                        aut modi, odit quaerat error ut excepturi cumque! Facere architecto accusamus repellendus
                        quas
                        vitae dolorum minus ad corporis harum sed, quidem tenetur fugit tempore laudantium, odit
                        unde
                        dignissimos eum cupiditate excepturi, distinctio optio voluptates ex impedit. Recusandae
                        nihil
                        eaque ipsa alias necessitatibus! Harum, nemo quam totam consectetur ea maxime laboriosam in
                        nam
                        asperiores, numquam ipsum, magni tempora eaque pariatur officia? Aspernatur ratione itaque
                        dignissimos laboriosam quae rerum ipsum autem beatae velit est impedit dolorem repellendus
                        tempora quibusdam laudantium nobis doloribus architecto dicta eveniet, incidunt sed
                        exercitationem qui cumque. Sunt maxime hic voluptatibus quidem totam ut. Sunt rerum aperiam
                        quidem explicabo molestiae quia similique inventore rem fugiat cupiditate beatae a, aliquam
                        vitae numquam necessitatibus quos voluptatibus laudantium illo ea dolores consequatur hic
                        pariatur nisi maxime? Molestiae dolorem, harum adipisci unde voluptas temporibus quis hic
                        iste a
                        necessitatibus voluptatibus numquam sit laboriosam ducimus. Velit corrupti quisquam eos
                        molestiae ex sint consequuntur nisi. Blanditiis laboriosam enim deserunt repellat iusto eius
                        ut,
                        quisquam maxime distinctio dolorem vero optio. Voluptas ratione magni, iusto aspernatur
                        fugiat
                        iure laudantium velit repellendus ducimus, pariatur earum eum nihil distinctio quidem,
                        impedit
                        voluptatum soluta fugit nobis error facere mollitia illo! Veritatis minus iste non aliquam
                        error
                        dolores, sint sapiente voluptatem ex nihil necessitatibus perferendis modi quod facere
                        accusamus. Quidem magnam quae voluptates molestiae dolore quisquam fugit ullam, eligendi
                        architecto veritatis eaque nesciunt facilis, voluptatem ad dolor? Ex provident impedit rerum
                        consequuntur aperiam exercitationem sunt fugiat? Praesentium ducimus repudiandae doloribus
                        iusto
                        tempore eum! Quis doloribus minus molestias nam illum error quam quidem. Laboriosam harum
                        ipsam
                        et vero ullam, voluptatum nesciunt fuga magni nam beatae dicta, quis in quos eius tempore
                        labore
                        laborum rem quia suscipit maxime quod? Ipsa voluptates at id, explicabo laudantium minus. Ut
                        qui
                        sit, sapiente omnis repudiandae soluta quibusdam, error dolorum unde fugit possimus et
                        voluptas
                        pariatur eaque, earum commodi alias natus ipsa ad facilis vero! Architecto, nam perferendis
                        animi quis voluptatem tenetur rem nostrum omnis blanditiis exercitationem at ut obcaecati!
                        Architecto ab aliquam quam vitae maiores corrupti ex perspiciatis sit et. Quia unde vitae
                        quam
                        quisquam nemo, laborum qui dolorum odit? Impedit numquam nihil, doloribus similique quasi
                        beatae
                        explicabo non autem itaque id tempore nam dolore porro culpa quae corrupti, nisi amet
                        accusamus
                        cupiditate. Amet, libero mollitia. Dignissimos omnis inventore, sit quae ullam ex earum
                        dicta
                        ipsum sequi veritatis provident ut voluptatum? Excepturi sint veniam ipsam ratione suscipit
                        possimus animi, veritatis omnis fugit dicta porro vero blanditiis ea labore eum velit
                        officiis.
                        Debitis ea suscipit vero modi rerum tempore alias sed impedit! Pariatur nobis repellat
                        similique
                        reiciendis cumque quod exercitationem enim eos tempora a, minima accusamus, illo voluptatem!
                        Excepturi rerum at recusandae iusto amet quia. Officia nobis maiores dolores eum
                        necessitatibus
                        quia quisquam ex consequuntur corrupti inventore. Quaerat quibusdam rem, aspernatur error
                        expedita, dolores saepe consectetur alias explicabo itaque odio ipsum incidunt. Atque
                        recusandae
                        reprehenderit, deleniti dolorem numquam eius unde deserunt veritatis corporis nostrum,
                        praesentium commodi. Quod, odit. Molestiae soluta quod maxime quas cumque dolorem eius
                        assumenda
                        quo, vero ipsam quam sunt nisi tenetur sapiente unde? Vel modi non voluptates aliquam culpa
                        aspernatur dolorem quibusdam est, illo porro voluptatibus expedita. Ad odio sunt quisquam.
                        Porro
                        harum dignissimos sunt. Nihil facilis ad fugiat incidunt dolorum beatae delectus optio nisi
                        doloremque ex placeat blanditiis eius, obcaecati quam aperiam sequi, laborum harum
                        necessitatibus tenetur officia, quidem qui quas similique! Optio iste dicta quasi
                        exercitationem? Sint officia pariatur, unde obcaecati, eveniet deserunt dolorum commodi ut
                        fugiat earum, corrupti aperiam incidunt aliquid aspernatur porro. Deleniti tempore
                        cupiditate
                        suscipit iure mollitia, atque quas officiis repellendus hic enim ea incidunt obcaecati
                        cumque
                        quasi consequuntur dolor illum, repudiandae laboriosam impedit maxime ullam pariatur
                        voluptatibus? Dignissimos optio recusandae eum quod provident repellendus natus quos
                        accusamus
                        explicabo aliquid vel, minima libero doloremque illum quia aut, delectus voluptatum quis
                        quisquam culpa! Similique pariatur magnam reprehenderit facilis saepe adipisci id. Corporis
                        quam
                        nobis sunt eum dolorem esse quia adipisci fuga blanditiis perspiciatis. Esse cum magnam
                        laboriosam unde cumque sunt odit possimus quos! Laboriosam, numquam laborum incidunt aut
                        dolorum
                        quos veritatis optio blanditiis tenetur, eum reprehenderit. Minus, quaerat. Dolore aliquid
                        ad
                        neque, illo provident iure officia amet, est eligendi laborum possimus nobis repellat modi
                        voluptatum. Error eveniet odio nemo quod odit vitae laudantium placeat expedita velit sint
                        molestiae numquam iure, accusamus nobis quam asperiores deserunt! Ratione rem perferendis et
                        possimus porro numquam maiores aliquam totam, pariatur facilis iste molestiae exercitationem
                        at
                        error suscipit voluptate non rerum, veritatis vel. Libero aspernatur saepe veritatis ratione
                        nulla laboriosam quis quos vero provident deleniti! Saepe fugit voluptatum dolore ullam
                        voluptate maxime optio necessitatibus. Nam labore porro aperiam explicabo molestias ipsa
                        magni,
                        vel, repudiandae maiores, hic nisi? Dolor maxime rem, distinctio itaque eum molestiae
                        veniam!
                        Quibusdam, laborum dolorum! Obcaecati temporibus, labore voluptatibus, facilis impedit
                        consequatur laborum quis, aliquam nisi officiis nesciunt dicta quo voluptates. Sequi alias
                        facilis, ad voluptatem aperiam eligendi explicabo omnis expedita minima provident earum
                        inventore enim nam ea deserunt magnam dignissimos iste fuga et non quos nobis sit? Nam
                        dolore
                        iure culpa ipsam nobis, vero quasi asperiores doloremque libero eaque maiores earum aperiam
                        autem recusandae, blanditiis corrupti, est aliquid possimus enim officiis nulla. Asperiores
                        placeat accusantium, ex nihil rem quibusdam distinctio quisquam voluptate adipisci accusamus
                        eius temporibus perferendis vitae eligendi nam libero doloribus. Commodi cupiditate id
                        repellendus vero sed dignissimos blanditiis earum ea illum numquam, nobis ullam dicta,
                        nostrum
                        quibusdam perspiciatis, error sapiente ab esse libero! Recusandae, impedit aut! Qui
                        blanditiis
                        quo asperiores odit optio fugiat porro molestias earum magni! Doloremque, ratione incidunt?
                        Praesentium, reprehenderit, id, dolorum odio beatae alias tempora blanditiis autem iure vel
                        nisi
                        ullam expedita. Vero quos modi necessitatibus odit possimus debitis natus nobis doloremque
                        facere enim quia dolorum maiores tenetur eligendi, ab, tempora soluta quae dicta nemo eaque
                        repellat vitae optio, aspernatur animi. Labore necessitatibus aut beatae officia, at dolores
                        fugit deleniti possimus quam incidunt quia vero quidem, tempora soluta, debitis hic enim
                        optio
                        facilis voluptatum odio quo. Qui tenetur sint, accusantium unde nobis repudiandae provident
                        facere laboriosam optio, dignissimos dolore doloremque autem molestias libero. Sint
                        consequatur
                        accusamus rem voluptates pariatur, ex, nesciunt ipsum consectetur nihil, cumque dolorum
                        obcaecati! Possimus quis aperiam assumenda, consequatur aspernatur commodi aliquam! Numquam
                        aliquam quae libero id accusantium voluptate, quos dolores assumenda adipisci ducimus esse
                        iure
                        tempore quidem, deserunt dolor minima ullam eos necessitatibus animi architecto perferendis
                        earum quia! Alias dolore molestiae eveniet tempora excepturi nihil recusandae corporis
                        adipisci
                        veniam reiciendis ipsam nemo, esse, ipsum quia soluta vel? Quod rem itaque totam saepe ipsa
                        tempora facilis, veritatis quo quisquam voluptatem, quis autem mollitia earum quas pariatur
                        laborum aliquam repellendus odio! Atque vitae mollitia veritatis praesentium minima? Aliquid
                        aperiam expedita fugit, recusandae similique alias enim doloribus, odio asperiores provident
                        corporis. Facilis illo consequatur ratione. Magni amet accusantium corporis esse nemo
                        suscipit
                        aperiam aliquam eaque quia harum quo dolores, libero consequuntur blanditiis ipsum repellat
                        beatae odio delectus labore error sint nulla ea sed. Cum quibusdam temporibus adipisci
                        perspiciatis laboriosam distinctio, et perferendis nihil aut voluptatibus quae sequi
                        consectetur
                        rem quia, ea eligendi, suscipit non! Libero dicta nam odio assumenda iusto porro. Fugiat
                        distinctio repellat vitae inventore rem delectus accusamus odit? Quibusdam modi eos
                        doloribus
                        fuga accusantium tempore ut pariatur consectetur qui veniam? Voluptas laborum maxime ab! Hic
                        consequuntur modi omnis cumque, quidem veritatis odit quia nam voluptatibus fugit, quibusdam
                        commodi soluta provident fuga! Esse, aliquid amet hic quasi aliquam repudiandae perspiciatis
                        repellendus molestiae officia, quia architecto provident velit, voluptas in aut. Eligendi
                        beatae
                        reprehenderit maxime ad magnam repudiandae laudantium quis. Reiciendis, est modi corrupti
                        nisi
                        inventore commodi laborum nobis quaerat sit rem facilis neque impedit, ad odio ullam
                        repellat
                        dignissimos reprehenderit, distinctio soluta deserunt ipsa ratione? Ratione recusandae vitae
                        blanditiis maxime. Tempora neque recusandae officiis eum officia tenetur dicta modi saepe.
                        Labore, consequuntur! A aperiam natus voluptates vel numquam laboriosam voluptatibus nulla
                        consequatur in rem placeat ad temporibus necessitatibus, exercitationem veritatis alias
                        culpa,
                        incidunt sint modi fuga quaerat. Et eligendi eaque voluptatem magni asperiores hic, atque
                        commodi animi voluptates laudantium delectus quia excepturi nam consequuntur. Cum quaerat,
                        ratione voluptatum cumque neque molestiae sapiente quasi illo. Nulla iusto sit ipsam sequi,
                        voluptate ipsa blanditiis labore repellendus quae! Blanditiis nemo, nostrum quidem aut
                        laudantium in suscipit at voluptatem recusandae doloremque repudiandae, temporibus ducimus
                        illo?
                        Officia dicta praesentium rerum et provident iusto nam, voluptatum vitae nulla fugit qui
                        necessitatibus, reprehenderit molestias vero adipisci alias fugiat deleniti tenetur unde
                        dolore
                        asperiores, harum dolor numquam! Quae vel nemo magni commodi sequi nobis maxime praesentium
                        tenetur earum dolores aliquam quo eum illum laudantium, quibusdam autem id mollitia harum
                        perspiciatis, aperiam ipsum temporibus sint officiis! Commodi nulla, reiciendis
                        reprehenderit
                        perspiciatis, aliquid quaerat minima provident voluptatibus eaque repellendus quia! Corporis
                        ad
                        nostrum consequatur eveniet vero, perferendis commodi maiores repellendus voluptate
                        voluptatem
                        architecto dolor, ea nam! Et atque, sunt dolorum eius mollitia dicta debitis aperiam eum
                        pariatur dignissimos maxime quos tempora at voluptate esse? In minus quia nesciunt
                        temporibus
                        nostrum quod, at placeat dolore cupiditate assumenda laudantium optio enim voluptatum iure
                        ab
                        ipsum ut, voluptate totam voluptas aut similique doloremque eius excepturi. Molestiae rem
                        nam
                        ipsa magnam totam! Qui, explicabo ducimus. Ipsum dolore nisi assumenda ratione repellat
                        obcaecati veniam reprehenderit velit eos quasi, fuga error molestiae nostrum iusto possimus
                        accusantium impedit eum eius voluptates? Omnis, nulla sunt. Molestiae minus eaque fuga
                        commodi
                        eveniet! Quasi placeat dicta neque sunt magni facilis blanditiis, saepe, voluptates a in
                        doloribus odio harum qui aliquid, enim earum eius quod recusandae adipisci delectus quidem
                        ipsum
                        modi! Placeat non debitis praesentium aperiam consequatur doloremque fuga ipsam illo
                        expedita.
                        Quis ullam nemo a quisquam, officiis animi vel dolores fugiat consequatur aperiam sunt sequi
                        eaque vero reprehenderit adipisci, facere eligendi laboriosam blanditiis veritatis porro
                        atque
                        itaque in ducimus ipsa! Unde, et fuga, minima quo voluptatum in autem perspiciatis culpa
                        repellat, ratione nisi minus similique. Commodi qui in saepe omnis. Distinctio voluptates
                        ullam
                        voluptas reiciendis. Dignissimos esse maxime natus earum minus, amet rem! Beatae aliquam,
                        adipisci earum, quis, sit veritatis exercitationem pariatur libero ratione a similique fuga
                        suscipit. Debitis accusantium molestiae, obcaecati cumque placeat, itaque corporis harum
                        facilis
                        id quam similique blanditiis totam amet porro. Amet quae sint possimus libero saepe ipsum?
                        Dolore, porro architecto. Quae commodi impedit optio consequuntur nulla inventore eligendi
                        magnam assumenda aliquid deserunt perspiciatis quos, veritatis fugit voluptatum modi
                        voluptates
                        sit totam? Quae, maxime? Blanditiis sunt quod numquam laborum voluptatibus, rerum doloremque
                        minus reprehenderit et, fugiat ab soluta! Obcaecati autem ducimus ut fugit ipsa
                        necessitatibus
                        optio quidem in sint provident, dolorum perferendis! Veritatis iste doloremque odit, tempora
                        voluptatem mollitia voluptate enim porro quos eius quis maxime tempore qui dolores totam,
                        excepturi vero repellendus accusamus ea eaque assumenda quisquam autem praesentium! Nemo,
                        vero
                        necessitatibus ea voluptate laborum qui quaerat? Non atque numquam alias vero ut ipsa
                        reprehenderit optio omnis quaerat, impedit ea iure at. Id ad, excepturi minus repellat
                        deserunt
                        sit perferendis et, incidunt veniam facilis quia a rerum iste ullam quidem at eos tempore
                        voluptatem modi. Ipsam ullam neque, suscipit atque, porro recusandae amet minus quidem nam
                        enim
                        explicabo, repellat nobis nostrum. Sapiente commodi ducimus aspernatur reiciendis omnis!
                        Excepturi repellat porro expedita non, et nam accusantium in id magni, voluptates, aut
                        cupiditate. Temporibus doloribus dolor corporis illo quasi accusantium eius dolorem ad,
                        ipsum
                        voluptates porro commodi. Molestias illum quibusdam officia adipisci cupiditate quidem in
                        laudantium asperiores rem ea architecto at dolores excepturi, sequi veniam inventore quos
                        aliquam magni eius totam facere, ad commodi sapiente illo? Eaque, optio dolores pariatur
                        animi
                        ut magnam? Repellendus reprehenderit dicta soluta qui sequi consectetur, quae molestiae
                        dolor
                        debitis sapiente blanditiis. Odit porro itaque similique, consequatur nam voluptas fugiat
                        assumenda harum veniam ab minus molestiae facere cupiditate, aut magni quis aliquam tempore
                        dolorum reiciendis accusamus possimus. A ex, numquam reprehenderit recusandae praesentium
                        explicabo veniam ea incidunt, sequi earum dolore mollitia quas temporibus, amet quod!
                        Possimus
                        ea explicabo quos? Atque ratione numquam consequuntur! Quae minima, laudantium voluptates
                        facere
                        assumenda aperiam sapiente nam corporis molestiae ipsam in harum soluta, blanditiis
                        consequatur
                        veritatis alias repellat eveniet fugit numquam, minus dolore. Numquam ex corrupti
                        perferendis
                        itaque pariatur explicabo nulla quidem, odio atque placeat recusandae sunt nemo, facere,
                        magni
                        officia eaque neque quod eum tempora minus repellendus eius fugit. Culpa nulla atque neque,
                        sunt
                        hic tempore ea id odit vitae, molestiae quibusdam dolorem facere, voluptatibus laboriosam
                        minus
                        molestias deleniti incidunt pariatur dicta iusto fuga? Minus laboriosam quibusdam temporibus
                        odio modi, itaque officiis fugit officia tempore nisi, odit veniam libero enim cupiditate
                        architecto facere maxime id culpa impedit quos ut assumenda hic consequatur. Numquam odit
                        minima
                        asperiores dolore quas quis temporibus, aliquid laborum tempora doloribus. Adipisci
                        aspernatur
                        sint quibusdam magni ullam dicta cumque tempora eaque in sapiente nihil, quam quasi quaerat
                        expedita hic vero asperiores laboriosam harum soluta ea praesentium. Deserunt quis sint
                        quaerat
                        tenetur praesentium quod molestias! Hic repellendus animi eveniet excepturi culpa libero
                        facilis
                        accusamus blanditiis, ea officiis quo dolorem, quaerat velit officia obcaecati quae ducimus.
                        Porro magnam maiores earum inventore perspiciatis a quo odio. Suscipit quasi voluptatibus
                        soluta
                        rerum veniam nostrum? Dolorum quod harum aliquam earum laborum? Pariatur cumque ut
                        consequatur
                        corrupti illo nesciunt eligendi exercitationem maxime fuga, sunt aliquid laborum neque amet
                        itaque quisquam inventore consequuntur, possimus deleniti, quia excepturi! Cum possimus amet
                        ipsum nemo. Hic, architecto. Excepturi, facere! Alias animi beatae vitae dolorum illum
                        natus,
                        aliquid at. At aut tempore aliquid sint veritatis beatae reprehenderit esse, quas quis
                        voluptatum natus voluptates adipisci minus id voluptatibus recusandae hic omnis itaque
                        officia
                        quos ad vitae illo. Ex consequuntur est minima perspiciatis vitae facilis accusantium
                        eligendi
                        nobis sunt sint aliquam placeat, itaque aut, impedit quae alias dolor velit iusto
                        necessitatibus
                        voluptatum optio! Voluptate laboriosam, sed, reprehenderit nostrum perferendis hic
                        perspiciatis
                        illum mollitia necessitatibus ab culpa quis modi laudantium, deserunt veritatis fugiat
                        officiis
                        ex voluptatum voluptatem architecto natus iste dolor molestiae? Quaerat delectus quasi
                        distinctio necessitatibus, dolores debitis impedit reiciendis ab repudiandae quo provident
                        aut
                        saepe et at consectetur maxime eligendi pariatur assumenda excepturi consequatur ut quis
                        minus
                        quod? Esse nesciunt nisi ducimus blanditiis consequuntur at? Recusandae nesciunt fuga veniam
                        hic
                        corporis corrupti, explicabo dolores eligendi nisi pariatur dicta perspiciatis sapiente
                        atque
                        voluptatibus ex velit. Autem laudantium fugiat vero harum omnis maxime numquam saepe
                        consequatur
                        amet eos. Porro assumenda dolorum officiis mollitia eligendi non recusandae fugiat aut nam
                        ad
                        ipsam vitae magni praesentium tenetur, facilis deserunt consequuntur nulla consequatur
                        laboriosam enim hic, repellendus voluptatum! Ut adipisci, fugiat consectetur fugit
                        laboriosam
                        hic illum quo nemo. Minus accusamus odio repudiandae deleniti nostrum qui quo rem amet unde
                        consectetur cum quis eveniet iure dolorem nesciunt reprehenderit accusantium voluptatem
                        praesentium pariatur, reiciendis quia officia quas. Ratione distinctio delectus quibusdam
                        repudiandae, totam illo, modi nesciunt vitae eveniet voluptatum eos obcaecati officia. Atque
                        autem quam tenetur earum saepe, minima possimus quidem, ratione voluptatibus perferendis
                        reiciendis consequuntur numquam dignissimos fugit dolore temporibus ad veritatis explicabo
                        suscipit error voluptatem ducimus doloribus provident repellendus. Facere mollitia eos
                        debitis
                        sequi dolore velit, nobis rem provident eveniet totam sint libero tempore veritatis quas,
                        voluptates recusandae. Adipisci earum quisquam labore saepe deleniti, error natus itaque,
                        enim
                        cum, a expedita maiores sapiente veritatis? Cupiditate eaque nostrum tempora. Incidunt sed
                        dicta
                        numquam mollitia reiciendis exercitationem odio laborum dolore nisi voluptatum beatae,
                        dignissimos nesciunt autem, necessitatibus eveniet quam doloribus molestias eos similique
                        sunt
                        maxime? Provident earum, culpa sint eum laborum ducimus dolorem esse dignissimos eos nam
                        soluta
                        fuga perferendis id! Inventore, maxime alias. Vero eius sed distinctio nemo soluta error
                        deserunt optio illum eligendi quasi deleniti amet voluptatem tempora animi, aut eos itaque,
                        hic
                        nulla dolores quis ex maxime totam? Aspernatur blanditiis possimus quo! Ratione, officia
                        laborum. Qui velit rem delectus repellendus.</el-tab-pane>
                    <el-tab-pane name="логистика" label="Логистика">Логистика</el-tab-pane>
                </el-tabs>

                <div class="button-block w-full fixed bottom-0 grid grid-flow-col gap-3 divide-x-2 bg-white ring-2 ring-light-blue md:rounded-t-md"
                    :style="{
                        width: control_buttons_w,
                        'grid-template-columns': `repeat(${control_buttons.length}, minmax(0, 1fr))`
                    }" v-if="control_buttons.length">
                    <div class="py-4 transition-colors duration-300 hover:text-light-blue active:duration-75 active:bg-primary active:text-white"
                        v-for="button in control_buttons" @click="button.action()">
                        <button class="text-center w-full">{{ button.title }}</button>
                    </div>
                </div>
            </div>
            <div class="result-block basis-6/12 hidden md:flex">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Earum ratione voluptates
                atque natus recusandae aliquid tempore itaque explicabo exercitationem odio quidem placeat accusamus
                quas
                omnis ea, enim labore ex et?</div>
        </div>
    </div>
</template>