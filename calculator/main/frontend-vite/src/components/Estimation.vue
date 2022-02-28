<script>
import Materials from './estimation_components/Materials.vue';
import Products from './estimation_components/Products.vue';
import Logistics from './estimation_components/Logistics.vue';
import Result from './Result.vue';
import ProductCardEdit from './estimation_components/ProductCardEdit.vue';


export default {
    props: {
        id: String,
    },
    data() {
        return {
            estimation: {},
            // showMobileResult: false,
            tabs: [
                {
                    name: "Материал",
                    value: "materials",
                    extraClass: ""
                },
                {
                    name: "Изделие",
                    value: "products",
                    extraClass: ""
                },
                {
                    name: "Логистика",
                    value: "logistics",
                    extraClass: ""
                },
            ]
        };
    },
    created() {
        this.$store.dispatch('getEstimation', this.id)
    },
    computed: {
        currentTab() {
            return this.$route.query.tab || "materials";
        },
        currentAssistBlock() {
            if (!Object.keys(this.$store.state[this.currentTab].values).length) {
                return 'result'
            }
            return this.$route.query.assistblock || "result";
        },
        showMobileResult(){
            return this.$route.query.showMobileResult === 'true' || false
        }
    },
    methods: {
        changeTab(tab) {
            this.$router.replace({ query: { tab } });
        },
        addCard() {
            this.$store.dispatch(`${this.currentTab}/addCard`)
                .then(id => {
                    let navbar_w = this.$refs.navbar.offsetHeight + 5
                    let newCard = document.getElementById(`${this.currentTab}-card-${id}`);
                    const y = newCard.getBoundingClientRect().top + window.pageYOffset - navbar_w - 10;
                    // let forms_h = document.getElementById('estimationForms').style
                    setTimeout(() => {
                        window.scrollTo({
                            top: y,
                            behavior: 'smooth',
                        })
                    })
                    return id
                }
                ).then((id) => this.currentTab == 'materials' ? this.editCard(id) : "")
        },
        editCard(id, block = 'card-edit-modal') {
            if (this.$route.query.editcardid == id) {
                this.closeEdit();
                return
            }
            let query = Object.assign({}, this.$route.query, { editcardid: id })
            this.$router.push({ query });
        },
        closeEdit() {
            let query = Object.assign({}, this.$route.query)
            delete query.assistblock
            delete query.editcardid
            delete query.editfield
            this.$router.push({ query });
        },
        deleteCard(id) {
            if (this.$route.query.editid == id) { this.closeEdit() }
            this.$store.commit(`${this.currentTab}/removeCard`, id);
        },
        hideMobileResult() {
            let query = Object.assign({}, this.$route.query, { showMobileResult: false })
            this.$router.push({ query });
            document.getElementsByTagName('body')[0].classList.remove('noscroll')
        },
        displayMobileResult() {
            let query = Object.assign({}, this.$route.query, { showMobileResult: true })
            this.$router.push({ query });
            document.getElementsByTagName('body')[0].classList.add('noscroll')
        },

    },

    components: { Materials, Products, Logistics, Result, ProductCardEdit }
}
</script>

<template>
    <div class="md:container mx-auto flex flex-row gap-8 mt-20">
        <div class="calculation-block lg:basis-7/12 flex flex-col gap-5 relative w-full">
            <div
                ref="navbar"
                class="navigation h-fit shadow-sm md:mt-1 md:top-[0.25rem] bg-white/[0.9] grid grid-cols-3 gap-1 sticky top-0 bg-white ring-1 ring-slate-200 py-3 px-2 z-20"
            >
                <div
                    class="h-full"
                    v-for="tab in tabs"
                    :key="tab.value"
                    :value="tab.value"
                    @click="changeTab(tab.value)"
                >
                    <button
                        class="h-full w-full p-1 py-2 rounded-full ring-1 ring-pink-500 ring-inset bg-white mx-auto"
                        :class="[tab.extraClass, tab.value == currentTab ? 'bg-unirock text-white ' : 'hover:bg-unirock/[.30]']"
                    >{{ tab.name }}</button>
                </div>
            </div>
            <div id="estimationForms" class="forms mb-[80vh] min-h-[20vh]">
                <component
                    :is="currentTab"
                    @close="closeEdit"
                    @delete="deleteCard"
                    @edit="editCard"
                ></component>
            </div>
            <div class="sticky controls bottom-0">
                <div
                    class="bg-white/[0.9] flex flex-row gap-[.25em] h-12 md:h-12 md:ring-1 ring-slate-200 md:mb-1 w-full"
                >
                    <div
                        class="result-offcanvas-show lg:hidden w-full h-full bg-unirock/[0.7] text-white hover:bg-black-200 active:bg-white active:ring-1 active:text-unirock_dark ring-unirock ring-inset  my-auto"
                    >
                        <button class="w-full h-full" @mouseup="displayMobileResult()">Итог</button>
                    </div>
                    <div
                        class="w-full h-full hover:bg-unirock/[0.6] khover:text-white bg-unirock text-white active:bg-white active:ring-1 active:text-unirock_dark ring-unirock ring-inset my-auto"
                    >
                        <button class="new-card w-full h-full" @click="addCard()">Добавить карточку</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="result-block hidden lg:flex lg:basis-5/12 lg:flex-col lg:gap-5">
            <div
                class="toolbar bg-white rounded-md border shadow-lg py-5"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            <div class="sticky top-1 w-full h-fit">
                <div
                    id="workpanel"
                    class="result overflow-y-auto overscroll-contain bg-white h-[100vh] rounded-md shadow-lg px-4 border will-change-scroll"
                >
                    <!-- <Transition name="fade" mode="out-in"> -->
                    <component is="result" @close="closeEdit()" :key="$route.query.editid || 0"></component>
                    <!-- </Transition> -->
                </div>
            </div>
        </div>
        <transition name="slidein">
            <div
                v-if="showMobileResult"
                class="flex result-modal fixed top-0 left-0 right-0 bottom-0 overflow-y-auto bg-white z-50"
            >
                <div class="modal-content-block container mx-auto mt-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero praesentium sequi voluptate, ipsa et eum dicta vel placeat obcaecati voluptatem facilis, facere exercitationem aspernatur! Repudiandae similique explicabo a! Voluptas, quis.
                    Vel officiis architecto enim? Libero praesentium deleniti minima, adipisci natus voluptatum quos veniam nam pariatur perspiciatis impedit harum, sint eaque? Nam rerum esse ullam illo temporibus, eveniet porro numquam commodi.
                    Illum minus labore blanditiis culpa! Asperiores molestias cumque unde nobis error debitis suscipit veniam reprehenderit facere consequuntur! Voluptatibus reprehenderit, vitae laudantium omnis quibusdam ipsum similique facilis aliquid dolorem fugit reiciendis.
                    Ea illum ad, laudantium unde voluptates ipsam dolorem vero qui rem quod blanditiis pariatur quidem quis, voluptas minus iusto. Quidem tempora perspiciatis officiis sed error pariatur vero blanditiis repudiandae ab.
                    Sint repellat harum aperiam quas et, nesciunt dicta laudantium, error laboriosam corrupti, dolore animi. Cupiditate, aperiam reiciendis fugit animi in repellat commodi molestiae iure esse eius incidunt facere. Voluptates, numquam!
                    Nobis nulla eaque quae necessitatibus voluptatem culpa cupiditate! A tempora recusandae eius, repellat vitae ipsam veritatis nesciunt odit amet earum animi suscipit accusamus magnam, necessitatibus ratione sequi beatae explicabo eos?
                    Deserunt optio beatae libero? Corrupti laudantium molestias eaque sunt fugiat, deserunt minima, nesciunt dicta libero voluptatem facilis consequatur placeat at consectetur veritatis expedita quisquam fugit cupiditate a provident aut nihil!
                    Aperiam saepe officia, facilis, ipsam nulla accusantium nostrum dolorum fuga dolorem commodi iusto veniam, temporibus veritatis distinctio illum quisquam amet quod? Ex, praesentium laboriosam ipsum quis temporibus pariatur quaerat saepe.
                    Distinctio sed fugiat possimus, ex expedita excepturi consequatur laborum voluptatibus, animi repudiandae iure alias earum? Sapiente voluptatibus, hic, quidem eligendi deleniti non neque voluptatum sequi eaque alias aliquid iure voluptate!
                    Quae qui consequatur vel quo dolorem quia, doloremque voluptates! Consequatur autem deserunt officiis voluptas expedita tenetur alias repellat nobis, dolores natus iste quo harum fugit vitae inventore assumenda nihil debitis.
                    Distinctio, totam! In dolores quod et earum fugit eius esse qui, nisi molestiae nostrum soluta doloremque consequuntur. Asperiores eius aperiam quasi cum voluptatem sunt autem eligendi magni, at, sit laborum.
                    Atque commodi repellendus eum consectetur quasi placeat labore sint animi quisquam, fugit quis neque. Reprehenderit doloremque eaque autem, ad nesciunt aspernatur aliquid, placeat doloribus, quae corporis temporibus minima quos tempore.
                    Numquam, quia unde? Corporis, repellendus cupiditate reiciendis quis dolore suscipit deserunt vitae quod atque reprehenderit necessitatibus delectus? Assumenda deserunt fugiat neque id temporibus perferendis quod obcaecati? Neque in delectus et!
                    Assumenda a deleniti saepe atque molestiae officia minus maiores, perferendis nostrum accusamus ipsum impedit maxime. Autem cumque doloribus sapiente, voluptates id illo distinctio ad rerum veritatis ab debitis non provident!
                    Fuga totam soluta voluptas eos amet aliquam harum unde dolore deleniti reprehenderit dolorem, nesciunt suscipit explicabo. Rem doloribus ullam repudiandae illo enim, expedita quo, numquam quia aspernatur quos recusandae earum.
                    Ratione, magnam quo iure maxime est ipsam et quae inventore doloremque. Distinctio dolores sed minus adipisci veniam nemo hic atque nobis laudantium ipsum, optio voluptas ullam, obcaecati placeat facilis id!
                    Excepturi vero nesciunt eius necessitatibus numquam dicta quibusdam sapiente facere iste quaerat adipisci repudiandae quos, mollitia autem esse deserunt, tenetur recusandae doloribus molestias delectus deleniti? A blanditiis atque aperiam molestias?
                    Ad sequi veniam sapiente ipsa iure quaerat inventore, iusto aspernatur ratione, quos, rerum consectetur molestiae architecto unde neque exercitationem. Molestiae, facilis. Doloremque tenetur repellendus aperiam ab, possimus rerum quasi asperiores.
                    Nobis voluptas quos aliquid! Necessitatibus omnis totam veritatis eum, minima dolor excepturi incidunt aspernatur mollitia voluptate optio commodi pariatur itaque quisquam odit. Repellat laudantium necessitatibus, reiciendis nemo accusantium consectetur nam.
                    Repudiandae officiis eveniet, labore sequi asperiores similique ipsam fuga facilis, sapiente soluta atque illo doloribus. Vitae rem neque quia incidunt! Possimus ducimus incidunt, ut doloribus accusantium nesciunt! Voluptas, mollitia corporis!
                    Similique porro cumque quidem corporis qui a eos, quisquam maiores quasi optio nulla. Eaque, quam odit dolore ex quod sed assumenda officia in obcaecati repellendus modi, asperiores saepe omnis nulla.
                    Consequuntur minus ullam odio quo quis deleniti at perferendis eius voluptate quisquam praesentium corrupti, illum ipsam fuga quam, inventore fugiat. Doloribus hic nesciunt fuga officiis nobis atque reprehenderit, dignissimos et.
                    Quaerat eveniet repellendus voluptate modi deserunt reprehenderit. Facilis, dicta sit temporibus minima sunt reprehenderit doloremque illo iste quia dolore impedit ea ab fugit odit vel placeat modi ex quas dolores.
                    Tempore consequuntur nisi porro adipisci at aspernatur molestias id blanditiis inventore tempora unde sapiente, nemo ipsam in odio fugiat magni dolores repellat natus eos modi dolorem laboriosam? Aliquam, sequi? Debitis?
                    Quisquam accusantium, illo, esse, numquam qui nemo sequi atque sunt amet aspernatur nulla non laborum unde ut? Ex minima nesciunt distinctio numquam a odio itaque iste assumenda fugiat. Optio, dolorum.
                    Iste magni aut quasi voluptates accusantium ducimus in at, eveniet delectus. Quod corporis cumque quidem saepe assumenda voluptatibus dicta, voluptas eveniet laborum quia perferendis impedit, doloremque, deleniti quae dolorem animi!
                    Saepe deserunt quae error veniam laboriosam praesentium ipsum. Dignissimos fuga nostrum molestias nemo amet, quo itaque perspiciatis iusto commodi non sequi ad nulla aliquid culpa illo earum at tempora eum!
                    Quibusdam totam earum voluptatibus facere exercitationem rem similique culpa rerum, ipsa, laudantium dolores debitis qui laborum distinctio id modi. Molestiae ex distinctio exercitationem doloremque odio autem! Eligendi cupiditate dolorem doloremque?
                    Quae voluptatum dolorem incidunt eaque atque! Aspernatur minima, maxime ullam, fuga eius deleniti totam odio ipsum mollitia consectetur quo iure dolorum placeat non, officiis error vel voluptas repudiandae. Pariatur, at?
                    Consequuntur sed saepe ab maxime ducimus incidunt, non soluta harum nulla facere nisi reiciendis voluptates, modi magnam impedit ipsam blanditiis et? Minima officiis ab nihil provident tempora impedit iusto doloribus.
                    Dicta ipsa autem rerum sint, repellendus est numquam! Quae excepturi vitae sapiente omnis voluptas aliquid neque tenetur facilis quam, id tempora! Corrupti necessitatibus dolores unde aliquam tenetur qui consequatur maxime?
                    Deserunt quos aspernatur praesentium. Dolorem quisquam corporis, praesentium quas doloribus tempore ullam id consequatur eos atque. Odio maxime quas quibusdam alias beatae saepe! Deserunt velit unde dicta, repudiandae quam similique.
                    Vel voluptates, animi assumenda corporis beatae sit pariatur aliquam. Obcaecati sapiente aut cupiditate debitis harum dolore, qui voluptas fuga? Ea delectus doloribus esse blanditiis reprehenderit similique voluptatum architecto alias accusantium?
                    Sed quidem amet ipsum blanditiis aliquid doloribus enim vel harum animi, aperiam maiores fugit, nihil voluptatibus nulla quaerat, omnis eos similique odit corrupti perferendis porro dolore! Ut iste voluptatum omnis!
                    Deleniti asperiores mollitia, dolorum earum qui necessitatibus! Possimus voluptatibus repellendus esse debitis praesentium at. Officia repellat distinctio, nobis consequatur quidem facilis et alias neque deserunt? Error explicabo laudantium quod delectus.
                    Nisi hic minus unde quaerat facere qui repellat dolorem iure aut pariatur quo, quidem ducimus molestiae iste accusamus porro quos, assumenda provident. Ea repellendus sapiente blanditiis ut tempore iure quia.
                    Illum adipisci explicabo sapiente voluptatum laudantium. Sit tenetur corrupti autem, incidunt quas aliquam sint ducimus animi iusto dolor perspiciatis atque vitae repellat dolorum dignissimos odit, reprehenderit quisquam dicta nemo ea!
                    Placeat quis fuga suscipit dolor corrupti, repellendus officia officiis maxime atque odit voluptatum, repellat minus ad! Explicabo veniam consequatur hic. Suscipit amet, error recusandae impedit cupiditate nisi nemo voluptas itaque.
                    Exercitationem fugiat perspiciatis impedit cupiditate, corrupti iusto vero placeat, at culpa praesentium esse aspernatur ratione, doloribus error! Perferendis architecto, nihil odio deleniti maxime quas unde, ex esse nemo magni optio.
                    Mollitia eveniet adipisci, nesciunt ab quos possimus iste facilis laborum quibusdam ullam nostrum iure in magni libero, repellat ducimus debitis soluta animi molestiae optio illum maiores recusandae. Commodi, voluptatum aliquam!
                    Eius obcaecati repellat porro delectus a molestiae veritatis enim quae, commodi reiciendis labore optio ipsum facilis necessitatibus maiores, eligendi atque incidunt iusto sequi maxime laborum doloremque nulla. Sint, commodi aut.
                    Maiores nulla laboriosam, consequatur quibusdam numquam odit minus praesentium animi reprehenderit, pariatur magni maxime, quas tempore. Deserunt in quas ipsam voluptatibus ipsa ab dolorum. Quas optio assumenda ipsam quod! Deleniti!
                    Sed, nisi officiis corporis iure alias nihil obcaecati provident veritatis! Voluptatibus ea ipsum optio quo consequatur, velit eveniet eius autem numquam adipisci. Dolorem modi qui laboriosam deleniti exercitationem vel cupiditate.
                    Doloremque impedit odio quod excepturi, ipsam nam aut, sapiente voluptas voluptate, in voluptatum placeat eum deserunt. Similique facere fuga quam architecto, fugiat suscipit asperiores iusto recusandae illum, eligendi provident error.
                    Quo eaque velit iure incidunt aspernatur eos, ad molestias! Tempora nihil non veritatis maxime. Alias nulla amet numquam, quidem earum provident inventore dolor temporibus, odio illum quisquam ratione? Officiis, molestiae!
                    Consequatur libero corrupti hic illo, reiciendis magnam molestias quod sequi similique nihil magni. Iusto doloribus quaerat rem! Saepe laudantium dolorem pariatur exercitationem totam soluta mollitia porro eveniet doloremque, nihil repellat!
                    Eum perspiciatis facere animi officia, eligendi nam eos. Nihil ratione aliquam voluptate eos excepturi a mollitia quis nostrum officiis. Eligendi quae molestias temporibus natus et voluptatem veniam quis fugiat quo!
                    Itaque odit modi vero repellat similique architecto ab non, tempore doloribus excepturi, nobis hic esse, cupiditate pariatur. Numquam, est impedit? Quae est, explicabo amet rerum aut voluptates molestias magnam voluptatem.
                    Atque, dolorem vero ab voluptatem rem, corrupti totam laudantium omnis voluptatum ut saepe. Culpa quaerat, voluptatum cumque quae, minima enim, eum ipsum vel tempora dignissimos illum ea cum nam magni?
                    Assumenda molestiae saepe quasi dolorem expedita, voluptatum quae cum, impedit, alias libero quos? Error voluptatibus suscipit dolorum aliquam, perspiciatis veritatis non, odio est quidem repudiandae, explicabo eos delectus esse hic.
                </div>
                <div
                    class="mobile-controls-modal bg-white/[0.95] fixed bottom-0 left-0 w-full flex flex-row gap-2 h-12 border-t-2"
                >
                    <div
                        class="result-offcanvas-hide w-full h-full bg-unirock text-white hover:bg-black-200 active:bg-cyan-300 my-auto"
                    >
                        <button class="w-full h-full" @mouseup="hideMobileResult()">Закрыть</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
    <product-card-edit @close="closeEdit"></product-card-edit>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s linear;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.slidein-enter-active {
    transform: translateY();
    -moz-transition: all .3s ease-out;
    transition: all .3s ease;
}
.slidein-leave-active {
    -moz-transition: all .3s ease-out;
    transition: all .3s ease;
}
.slidein-enter-from,
.slidein-leave-to {
    transform: translateY(100%);
}
</style>