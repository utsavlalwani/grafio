package com.stackroute.registrationservice.service;

import com.stripe.Stripe;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClient {
    @Autowired
    StripeClient() {
        Stripe.apiKey = "sk_test_gnCtprCLNNSHjV1VijD3e8TP0036eEsk4v";
    }

    public boolean chargeCreditCard(String token, double amount) throws Exception {
        Charge charge = null;
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "INR");
        chargeParams.put("source", token);
        chargeParams.put("description", "subscription for newsZoid");
        try {
            charge = Charge.create(chargeParams);
            return charge.getPaid();
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
