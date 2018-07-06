#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#include <ESP8266WiFi.h>
const char* ssid     = "santika";      // SSID
const char* password = "lenteng12345678";      // Password
const char* host = "192.168.1.7";  // IP Server
const int   port = 1234;            // Port servER
const int   watchdog = 5000;        // Frequency watchdog
unsigned long previousMillis = millis(); 

const int trigPin = 13; //GPIO 13 - D7
const int echoPin = 15; //GPIO 15 - D8

const int trigPin2 = 14;//GPIO 14 - D5 
const int echoPin2 = 12;//GPIO 12 - D6

long duration, distance, duration2, distance2, tinggiTB, tinggiTS;

int torenBesar = 20;
int torenSedang = 20;  

const int led_merah = 16; //GPIO 2 - D4
const int led_kuning = 2;//GPIO 0 - D3
const int led_biru = 0;//GPIO 16 - D0
const int buzzer = 16;

/*
VCC : Biru dan Merah
Ground : Orange dan Abu-abu  
 */

LiquidCrystal_I2C lcd(0x27,16,2); 

void setup() 
{
  Serial.begin(115200);
  lcd.init();
  lcd.init();
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);

  pinMode(led_biru, OUTPUT);
  pinMode(led_merah, OUTPUT);
  pinMode(led_kuning, OUTPUT);
  pinMode(buzzer, OUTPUT);
    
  lcd.backlight();
  lcd.setCursor(2,0);
  lcd.print("Mulai Monitor");
  lcd.setCursor(7,1);
  lcd.print("Air"); 
  
  Serial.begin(115200);
  Serial.print("Terhubung ke ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Berhasil terhubung Wi-Fi");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
 
void loop() {
  lcd.clear();
  
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration/58.2;
  tinggiTB = torenBesar - distance;
  
  digitalWrite(trigPin2, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  duration2 = pulseIn(echoPin2, HIGH);
  distance2 = duration2/58.2;
  tinggiTS = torenSedang - distance2;
  //tinggiTS = 90;
  
  Serial.print("Pembacaan Sensor Ultrasonik Toren Besar : ");
  Serial.println(distance);
  Serial.print("Pembacaan Sensor Ultrasonik Toren Sedang : ");
  Serial.println(distance2);

  Serial.print("Tinggi Toren Besar : ");
  Serial.println(tinggiTB);
  Serial.print("Tinggi Toren Sedang : ");
  Serial.println(tinggiTS);
  Serial.println("=======================================================");
  
  if(tinggiTB <= 10 && tinggiTS <= 10)
   {
  lcd.setCursor(2,0);
  lcd.print("Status Toren");
  lcd.setCursor(6,1);
  lcd.print("Habis");
  digitalWrite(buzzer, HIGH);
  delay(500);
  digitalWrite(buzzer, LOW);
  digitalWrite(buzzer, HIGH);
  delay(500);
  digitalWrite(buzzer, LOW);
  digitalWrite(led_merah, HIGH);
  digitalWrite(led_biru, LOW);
  digitalWrite(led_kuning, LOW);
  smsDataPass();
  delay(3000);
  }

  else if(tinggiTB>10 && tinggiTS<=10)
  {
  digitalWrite(led_merah, LOW);
  digitalWrite(led_biru, LOW);
  digitalWrite(led_kuning, HIGH);
  digitalWrite(buzzer, LOW);
  lcd.setCursor(0,0);
  lcd.print("Tor.Besar");
  lcd.setCursor(10,0);
  lcd.print(tinggiTB);
  lcd.setCursor(14,0);
  lcd.print("cm");
  lcd.setCursor(0,1);
  lcd.print("Tor.Kecil");
  lcd.setCursor(10,1);
  lcd.print(tinggiTS);
  lcd.setCursor(14,1);
  lcd.print("cm");
  delay(1000);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Tor.Besar");
  lcd.setCursor(10,0);
  lcd.print(tinggiTB);
  lcd.setCursor(14,0);
  lcd.print("cm");
  lcd.setCursor(0,1);
  lcd.print("Tor.Kecil");
  lcd.setCursor(10,1);
  lcd.print("Kosong");
  sendDataID();
  delay(3000);        
  }

  else if(tinggiTB<=10 && tinggiTS>10)
  {
  digitalWrite(led_merah, LOW);
  digitalWrite(led_biru, LOW);
  digitalWrite(led_kuning, HIGH);
  digitalWrite(buzzer, LOW);
  lcd.setCursor(0,0);
  lcd.print("Tor.Besar");
  lcd.setCursor(10,0);
  lcd.print(tinggiTB);
  lcd.setCursor(14,0);
  lcd.print("cm");
  lcd.setCursor(0,1);
  lcd.print("Tor.Kecil");
  lcd.setCursor(10,1);
  lcd.print(tinggiTS);
  lcd.setCursor(14,1);
  lcd.print("cm");
  delay(1000);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Tor.Besar");
  lcd.setCursor(10,0);
  lcd.print("Kosong");
  lcd.setCursor(0,1);
  lcd.print("Tor.Kecil");
  lcd.setCursor(10,1);
  lcd.print(tinggiTS);
  lcd.setCursor(14,1);
  lcd.print("cm");
  sendDataID();
  delay(3000);     
  }
  
  else if(tinggiTB>10 && tinggiTS>10)
  {  
  digitalWrite(led_merah, LOW);
  digitalWrite(led_biru, HIGH);
  digitalWrite(led_kuning, LOW);
  digitalWrite(buzzer, LOW);
  lcd.setCursor(2,0);
  lcd.print("Status Toren");
  lcd.setCursor(6,1);
  lcd.print("Penuh");
  delay(1000);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Tor.Besar");
  lcd.setCursor(10,0);
  lcd.print(tinggiTB);
  lcd.setCursor(14,0);
  lcd.print("cm");
  lcd.setCursor(0,1);
  lcd.print("Tor.Kecil");
  lcd.setCursor(10,1);
  lcd.print(tinggiTS);
  lcd.setCursor(14,1);
  lcd.print("cm");
  sendDataID();
  delay(3000);
  }
}

void sendDataID()
{
  
  unsigned long currentMillis = millis();
 
  if ( currentMillis - previousMillis > watchdog ) {
    previousMillis = currentMillis;
    WiFiClient client;
 
    if (!client.connect(host, port)) {
      Serial.println("connection failed");
      return;
    }
 
    String url = "/depot/getTangkiAirData?sensor1=";
    url += tinggiTB;
    url += "&sensor2=";
    url += tinggiTS;
    url += "&order=";
    url += "full";
  
     client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");
    unsigned long timeout = millis();
    while (client.available() == 0) {
      if (millis() - timeout > 5000) {
        Serial.println(">>> Client Timeout !");
        client.stop();
        return;
      }
    }
      // Read all the lines of the reply from server and print them to Serial
    while(client.available()){
      String line = client.readStringUntil('\r');
      Serial.print(line);
    }
}  
}

void smsDataPass()
{
  
  unsigned long currentMillis = millis();
 
  if ( currentMillis - previousMillis > watchdog ) {
    previousMillis = currentMillis;
    WiFiClient client;
 
    if (!client.connect(host, port)) {
      Serial.println("connection failed");
      return;
    }
 
    String url = "/depot/getIFTTT?sensor1=";
    url += tinggiTB;
    url += "&sensor2=";
    url += tinggiTS;
    url += "&order=";
    url += "pass";
   
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");
    unsigned long timeout = millis();
    while (client.available() == 0) {
      if (millis() - timeout > 5000) {
        Serial.println(">>> Client Timeout !");
        client.stop();
        return;
      }
    }
      // Read all the lines of the reply from server and print them to Serial
    while(client.available()){
      String line = client.readStringUntil('\r');
      Serial.print(line);
    }
}  
}

