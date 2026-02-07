/*
    Based on Neil Kolban example for IDF: https://github.com/nkolban/esp32-snippets/blob/master/cpp_utils/tests/BLE%20Tests/SampleServer.cpp
    Ported to Arduino ESP32 by Evandro Copercini
    updates by chegewara
*/
#include <math.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <BLE2902.h>

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID              "cc751e66-cf9c-467b-af12-82389c760810"
#define CHARACTERISTIC_UUID_X     "e8a23c73-f1b1-490d-b941-48b9cb143f34"
#define CHARACTERISTIC_UUID_Y     "6309299c-1e05-4f47-8cb7-88430f4a7427"
#define CHARACTERISTIC_UUID_Z     "eee30242-204c-4125-a5ce-b542d8dcf8fd"

int temp; //variable to hold temperature sensor value
long tm,t,d; //variables to record time in seconds


BLEServer* pServer = NULL;
BLECharacteristic* pCharacteristic_X = NULL;
BLECharacteristic* pCharacteristic_Y = NULL;
BLECharacteristic* pCharacteristic_Z = NULL;
bool deviceConnected = false;
bool oldDeviceConnected = false;
uint32_t value = 0;

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
      Serial.println("Device connected!");
    };

    void onDisconnect(BLEServer* pServer) {
      Serial.println("Device disconnected!");
      deviceConnected = false;
    }
};


void setup() {
  Serial.begin(115200);

  BLEDevice::init("Playback");

  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);

  pCharacteristic_X = pService->createCharacteristic(CHARACTERISTIC_UUID_X, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_NOTIFY);
  pCharacteristic_Y = pService->createCharacteristic(CHARACTERISTIC_UUID_Y, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_NOTIFY);
  pCharacteristic_Z = pService->createCharacteristic(CHARACTERISTIC_UUID_Z, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_NOTIFY);

  pService->start();

  // BLEAdvertising *pAdvertising = pServer->getAdvertising();  // this still is working for backward compatibility
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();

  Serial.println("Waiting a client connection to notify...");
}

void loop() {



// notify changed value
    if (deviceConnected) {
        unsigned long currentTime = millis();
        float timeInSeconds = currentTime / 1000.0;

        float sineValue_X = sin(2 * PI * 0.1 * timeInSeconds) * 1.5;
        float sineValue_Y = sin(2 * PI * 0.3 * timeInSeconds) * 1.5;
        float sineValue_Z = sin(2 * PI * 0.01 * timeInSeconds) * 1.5;

        pCharacteristic_X->setValue((byte*) &sineValue_X, sizeof(float));
        pCharacteristic_Y->setValue((byte*) &sineValue_Y, sizeof(float));
        pCharacteristic_Z->setValue((byte*) &sineValue_Z, sizeof(float));
        pCharacteristic_X->notify();
        pCharacteristic_Y->notify();
        pCharacteristic_Z->notify();

        delay(50);//delay of .2 seconds
    }
    // disconnecting
    if (!deviceConnected && oldDeviceConnected) {
        delay(500); // give the bluetooth stack the chance to get things ready
        pServer->startAdvertising(); // restart advertising
        Serial.println("start advertising");
        oldDeviceConnected = deviceConnected;
    }
    // connecting
    if (deviceConnected && !oldDeviceConnected) {
        // do stuff here on connecting
        oldDeviceConnected = deviceConnected;
    }


}
