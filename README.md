# Farmer_Pond
Based on Farming Essentials water plays crucial role in farming 
so our Project is build to check the quality of water with respect to 2 main factor
pH of Water  &  TDS of water

pH is standardised as 
if pH is < 7 then water is Acidic
if pH is =7 then water is Neutral
if pH is >7 then water is Alkaline
pH of Water 

![pH+Scale](https://github.com/user-attachments/assets/5e559b9d-f5b2-464b-af23-edfcae265d28)


TDS is standardised as 
if TDS is around 50 - 100 = water is Good little pollutants
if TDS is around 200 - 400 
![Taste+of+Water+with+Different+TDS+Concentrations](https://github.com/user-attachments/assets/23c13518-d3fa-475c-aeb9-1bc07645cac6)


Working of Hardware 
Now based on this Our Hardware is divided into Two sections

TX - Section
Development board : - Ardiuno UNO
pH Sensor 
TDS Sensor
Ultrasonic Sensor --- To measure the water depth
Lora Module --- To transmit data to receiver section it uses RF signals to send the data
![WhatsApp Image 2025-08-04 at 00 57 56_38cc7875](https://github.com/user-attachments/assets/bf34ee8e-4315-4ce3-a8d2-bc5ee20515cb)

RX - Section
Development Board :- ESP32 integrated WiFi Module
Lora Module -- Fetch data from Transmitter Lora 
OLed Display - to show the data
![WhatsApp Image 2025-08-04 at 01 00 07_5c456481](https://github.com/user-attachments/assets/189b182d-3d46-4690-963b-0bcf1a86a7e8)

Beside data was sent to Backend -- Node JS by ESP32 using CURL Request
Backend data was Fetched and was sent to the Frontend Dashboard -- React JS using Web Socket which connect the client to server
![WhatsApp Image 2025-08-04 at 00 57 55_66b3ba1b](https://github.com/user-attachments/assets/e91d8f5d-4e6d-4194-b61c-95b7cd4d0c6f)
