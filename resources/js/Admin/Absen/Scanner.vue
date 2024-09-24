<template>
    <base-layout title="Scanner Absen">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Scanner</span>
                <div class="space-x-1">

                </div>
            </div>
            <div class="block rounded-2">
                <div class="block-content p-4">
                    <div class="scanner-frame">
                        <qrcode-stream
                        :paused="paused"
                        @detect="onDetect"
                        @camera-on="onCameraOn"
                        @camera-off="onCameraOff"
                        @error="onError"
                        >
                        <div
                            v-show="showScanConfirmation"
                            class="scan-confirmation"
                        >
                        </div>
                        </qrcode-stream>
                    </div>
                </div>
            </div>
        </div>
    </base-layout>
</template>
<style scoped>
/* Tambahkan CSS animasi di sini */
.scanner-frame {
  position: relative;
  width: 300px;
  height: 300px;
  border: 2px solid #00ff00;
  box-shadow: 0 0 10px #00ff00;
  margin: auto;
}

.scanner-frame::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #00ff00;
  animation: scan 2s infinite;
  z-index:10;
}

@keyframes scan {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}
</style>
<script>
import { QrcodeStream } from 'vue-qrcode-reader';
export default {
    components : {
        QrcodeStream,
    },
    data(){
        return {
            cameraPermission : 'prompt',
            paused: false,
            result: '',
            showScanConfirmation: false
        }
    },
    mounted(){
        this.checkCameraPermission;
    },
    methods : {
        onCameraOn() {
        this.showScanConfirmation = false
        },
        onError: console.error,

        onCameraOff() {
        this.showScanConfirmation = true
        },

        async onDetect(detectedCodes) {
            const result = JSON.stringify(detectedCodes.map((code) => code.rawValue))
            const code = result.replace(/[\[\]"]/g, '');
            // const result =
            // alert();
            // console.log(detectedCodes.);
            this.submit(code);
            this.paused = true
            await this.timeout(500)
            this.paused = false
        },
        timeout(ms) {
            return new Promise((resolve) => {
                window.setTimeout(resolve, ms)
            })
        },
        submit(code) {
            this.loading = true;
            let form = this.$inertia.form({
                code : code
            });
            form.post(this.route('admin.absen.scan'), {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {
                    ElMessage({
                        type: 'success',
                        message: 'Terimakasih',
                    });
                },
                onError: (e) => {
                    ElMessage({
                        type: 'error',
                        message: e.code,
                    });
                }
            });
        },
        checkCameraPermission() {
        navigator.permissions.query({ name: 'camera' })
            .then((permissionStatus) => {
                this.cameraPermission = permissionStatus.state;
                permissionStatus.onchange = () => {
                    this.cameraPermission = permissionStatus.state;
                };
            })
            .catch((error) => {
                console.error("Error checking camera permission:", error);
            });
        },
    }
}
</script>