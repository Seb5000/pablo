<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";

const criptos = ref([]);
const posicion = ref("LONG");
const precioEntrada = ref(0);
const stopLossPorcentaje = ref(3);

const precioStopLoss = computed(() => {
  const pe = parseFloat(precioEntrada.value);
  const sl = parseFloat(stopLossPorcentaje.value);
  let resultado = "";

  if (posicion.value === "LONG") {
    resultado = pe - (sl * pe) / 100;
  } else if (posicion.value === "SHORT") {
    resultado = pe + (sl * pe) / 100;
  }

  return resultado;
});

const actualizarCriptos = () => {
  axios.get("https://api.binance.com/api/v3/ticker/price").then((resp) => {
    console.log(resp.data);
    const response = resp.data;

    const filtrado = response.filter((item) => {
      if (item.symbol.includes("USDT")) {
        return item;
      }
    });
    criptos.value = filtrado;
  });
};

onMounted(() => {
  actualizarCriptos();

  // el.value // <div>
});
</script>

<template>
  <div class="form-container">
    <div class="form">
      <div class="form-title">
        <div class="form-title-main">
          CALCULO CAPITAL DE TRABAJO - PRECIO DE LIQUIDACION
        </div>
        <div class="form-title-sub">
          (EN FUNCION DEL RIESGO Y EL APALANCAMIENTO)
        </div>
      </div>
      <div class="wrapper">
        <div class="form-section">
          <div class="input-container">
            <label class="label bold">Selecione su nivel de experiencia</label>
            <div class="custom-input">
              <select name="" id="">
                <option value="">Principiante</option>
                <option value="">Intermedio - Avanzado</option>
              </select>
              <span>USDT</span>
            </div>
          </div>
          <div class="input-container">
            <label class="label">CAPITAL EN BILLETERA DE FUTUROS</label>
            <div class="custom-input">
              <input type="text" />
              <span>Introduzca la cantidad en USDT</span>
            </div>
          </div>
          <div class="input-container">
            <label class="label bold">GESTION DE RIESGO (CAPITAL)</label>
          </div>
          <div class="input-container">
            <label class="label">Intermedio - Avanzado (Automatico)</label>
            <div class="custom-input">
              <input type="text" />
            </div>
          </div>
        </div>
        <div class="two-columns">
          <div class="form-section">
            <h4 class="title-text">FUTUROS</h4>
            <div class="input-container">
              <label class="label">Posicion</label>
              <div class="custom-input">
                <select class="bg-green" v-model="posicion">
                  <option value="LONG">LONG</option>
                  <option value="SHORT">SHORT</option>
                </select>
              </div>
            </div>
            <div class="input-container">
              <label class="label bold">Cantidad a arriesgar</label>
            </div>
            <div class="input-container">
              <label class="label">Mannual (Intermedio Avanzado)</label>
              <div class="custom-input">
                <input type="text" value="50.00" />
                <span>USDT</span>
              </div>
            </div>
            <div class="input-container">
              <label class="label">Apalancamiento</label>
              <div class="custom-input">
                <input type="text" value="10x" />
              </div>
            </div>
          </div>
          <div class="form-section">
            <h4 class="title-text">ACTIVO</h4>
            <div class="input-container">
              <label class="label">Moneda/Par</label>
              <div class="custom-input">
                <select>
                  <option v-for="item in criptos" value="">
                    {{ item.symbol }} ({{ item.price }})
                  </option>
                </select>
                <button @click="actualizarCriptos">A</button>
                <!-- <input type="text" value="BTC/USDT" /> -->
              </div>
            </div>
            <div class="input-container">
              <label class="label">Precio de la entrada</label>
              <div class="custom-input">
                <input type="text" v-model="precioEntrada" />
                <span>USDT</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-section-grid">
          <h4 class="grid-title">ANALISIS</h4>
          <div class="input-container">
            <label class="label">Stop Loss</label>
            <div class="custom-input">
              <input type="text" v-model="stopLossPorcentaje" />
              <span>%</span>
            </div>
          </div>
          <div class="input-container">
            <label class="label">Precio stop loss</label>
            <div class="custom-input">
              <input type="text" v-model="precioStopLoss" />
              <span>USDT</span>
            </div>
          </div>
          <div class="input-container">
            <label class="label">Take Profit</label>
            <div class="custom-input">
              <input type="text" value="9" />
              <span>%</span>
            </div>
          </div>
          <div class="input-container">
            <label class="label">Precio take profit</label>
            <div class="custom-input">
              <input type="text" value="49985" />
              <span>USDT</span>
            </div>
          </div>
          <div class="input-container">
            <label class="label">Relacion riesgo/beneficio</label>
            <div class="custom-input">
              <input class="bg-green" type="text" value="3.00" />
            </div>
          </div>
          <div class="input-container">
            <label class="label bold">Precio liquidacion</label>
            <div class="custom-input">
              <input type="text" value="986532" />
              <span>USDT</span>
            </div>
          </div>
        </div>
        <div class="form-section">
          <h4 class="title-text">FINANCIAMIENTO POSICION</h4>
          <div class="input-container">
            <label class="label">Capital Actual (Billetera de FUTUROS)</label>
            <div class="custom-input">
              <input class="bg-green" type="text" value="BTC/USDT" />
              <span>USDT</span>
            </div>
          </div>
          <div class="input-container">
            <label class="label">Tamaño posicion</label>
            <div class="custom-input">
              <input type="text" value="BTC/USDT" />
              <span>USDT</span>
            </div>
          </div>
        </div>
        <div class="form-section">
          <div class="results-container">
            <h4>
              Cantidad de dinero necesaria para abrir la posicion bajo las
              condiciones establecidas en el analisis y para:
            </h4>
            <div class="resultados-flex">
              <div class="input-container capital-necesario">
                <label class="label title-text">Capital necesario</label>
                <div class="custom-input">
                  <input type="text" value="BTC/USDT" />
                  <span>USDT</span>
                </div>
              </div>
              <div class="resultados-texto">
                <p class="bold">RIESGO (USDT): 50.00</p>
                <p class="bold">APALANCAMIENTO: 10x</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
