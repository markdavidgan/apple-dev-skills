# Preflight Pack — VPN & Network Utility Apps

---

### VPN Must Use NEVPNManager / NetworkExtension  ·  Guideline 5.4  ·  REJECTION
- **What to check:** VPN apps must implement tunneling via `NEVPNManager`, `NETunnelProviderManager`, or `NEPacketTunnelProvider` from the NetworkExtension framework. Apps that attempt to route traffic through non-system-approved mechanisms (e.g., proxy-only, custom socket layer without the NE entitlement) are rejected.
- **How to detect:** Use `asc_check_submission` for entitlement validation errors. Check the app's `.entitlements` file for `com.apple.developer.networking.vpn.api` and `com.apple.developer.networking.networkextension`. Verify the NetworkExtension bundle extension (`.appex`) is present in the app bundle and declares the correct `NSExtensionPointIdentifier` (`com.apple.networkextension.packet-tunnel` or equivalent).
- **Resolution:** Implement the appropriate `NEProvider` subclass. Request the NetworkExtension entitlement via the Apple Developer portal. Ensure the App Extension target is included in the main app bundle. Refer to Apple's Human Interface Guidelines for VPN onboarding best practices.
- **Example rejection:** "Your app provides VPN functionality but does not use the NetworkExtension framework as required. All VPN apps must use the approved APIs to establish VPN connections."

---

### VPN Provider Must Be an Enrolled Organization  ·  Guideline 5.4  ·  REJECTION
- **What to check:** VPN services must be offered by organizations enrolled in the Apple Developer Program as a company or organization (not an individual account). The VPN service must be operated by the developer of record or an entity they represent.
- **How to detect:** Use `asc_get_metadata` to check the seller name and developer type. Individual-account submissions offering third-party VPN services are a red flag. Verify that the App Review notes or Terms of Service identify the VPN infrastructure operator and its relationship to the developer.
- **Resolution:** Re-enroll under an organizational developer account. Ensure the Terms of Service and privacy policy name the VPN operator and describe the service relationship. If acting as a reseller, document the formal agreement with the infrastructure provider in App Review notes.
- **Example rejection:** "Your app provides a VPN service but is submitted under an individual developer account. VPN apps must be submitted by organizations that provide the VPN service themselves."

---

### No Selling or Sharing User Traffic Data  ·  Guideline 5.4  ·  REJECTION
- **What to check:** VPN providers must commit in their privacy policy and App Store privacy nutrition label that user traffic, browsing history, and connection metadata are not sold to third parties or used for advertising targeting. Any such use is a direct guideline violation.
- **How to detect:** Use `asc_get_privacy` to retrieve declared data types. Flag any declared use of "Browsing History" or "Identifiers" for "Third-Party Advertising" or "Developer's Advertising." Read the linked privacy policy for data-selling or data-sharing clauses. Check whether any third-party analytics SDK is embedded that receives network-level data.
- **Resolution:** Remove any data-sale or data-sharing clauses from the privacy policy. Update the nutrition label to remove advertising-purpose data uses for traffic data. Audit embedded SDKs and disable or remove any that receive user traffic metadata. Add an explicit "We do not sell your data" statement to the privacy policy and in-app settings.
- **Example rejection:** "Your app's privacy policy indicates that user traffic data may be shared with or sold to third parties. VPN apps must not monetize user data collected in the course of providing the VPN service."

---

### No Collection of Data Unrelated to VPN Function  ·  Guideline 5.4 / 5.1.1  ·  REJECTION
- **What to check:** A VPN app may collect only the data necessary to provide the VPN service (e.g., account credentials, connection logs for troubleshooting). Collecting contact lists, photos, device sensors, or broad analytics unrelated to connectivity is prohibited.
- **How to detect:** Use `asc_get_privacy` and compare declared data types against what a VPN service legitimately requires. Flag data types such as "Contacts," "Photos or Videos," "Location" (beyond coarse IP-based region selection), or "Health & Fitness" as almost certainly extraneous. Audit the binary for permission request strings (`NSContactsUsageDescription`, etc.) that suggest unrelated collection.
- **Resolution:** Remove all data collection not directly required for VPN provisioning, authentication, and troubleshooting. Delete unrelated permission strings and SDK integrations. Update the nutrition label to reflect only the data that remains.
- **Example rejection:** "Your app requests access to user data (contacts, photos) that has no clear relationship to the functionality of a VPN service. Apps may only collect data necessary for their core functionality."

---

### Privacy Policy Mandatory  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** All VPN apps must include a link to a privacy policy both on the App Store product page and within the app itself. The policy must describe what data is collected, how it is used, how long it is retained, and how users can request deletion.
- **How to detect:** Use `asc_get_metadata` to verify the privacy policy URL field is populated. Launch the app and navigate to Settings/About to confirm the in-app privacy policy link is present and resolves to a live page. Check that the policy covers VPN-specific data (connection logs, IP addresses, session timestamps).
- **Resolution:** Draft or update a VPN-specific privacy policy that explicitly addresses connection logging practices (zero-log claim requires auditable technical controls). Populate the App Store Connect privacy policy URL field and add a tappable link within the app UI. See `rule-privacy.md` for full nutrition label guidance.
- **Example rejection:** "Your app does not include a link to a privacy policy on its App Store product page, which is required for all apps."

---

### No Private APIs in Network Utilities  ·  Guideline 2.5.1  ·  REJECTION
- **What to check:** Network and utility apps frequently attempt to use private APIs to inspect network interfaces, packet contents, or system configurations (e.g., undocumented `SystemConfiguration` calls, private `CoreTelephony` symbols, kernel extension remnants). These are rejected.
- **How to detect:** Run `nm -u <binary>` or use MachOView to scan for symbols with `_` prefixes not present in public SDK headers. Use `asc_check_submission` for "ITMS-90338: Non-public API usage." Compare symbol names against the current iOS/macOS SDK header exports.
- **Resolution:** Replace private API calls with documented equivalents from NetworkExtension, CoreTelephony's public interface, or CFNetwork. If no public API exists for the required capability, redesign the feature or request an entitlement through Apple's formal entitlement request process.
- **Example rejection:** "Your app uses one or more non-public APIs: [symbol list]. The use of non-public APIs is not permitted on the App Store as it may lead to a poor user experience if those APIs change."

---

### Content Blockers Must Use the Proper Extension API  ·  Guideline 2.5.1 / 5.4  ·  REJECTION
- **What to check:** Apps that block ads or trackers in Safari must use the `WKContentRuleList` / Content Blocker Extension API. Implementing content filtering by proxying all device traffic through a VPN-based DNS sinkhole without user transparency and proper VPN entitlements is a violation.
- **How to detect:** Check the app bundle for a Content Blocker extension (`NSExtensionPointIdentifier: com.apple.Safari.content-blocker`). If the app instead establishes a local VPN or DNS-over-HTTPS profile to achieve blocking, verify it declares the `NEVPNManager` entitlement and clearly discloses this mechanism to users.
- **Resolution:** For Safari content blocking: implement a proper `WKContentRuleListStore`-backed extension. For system-wide blocking via DNS/VPN: declare the NetworkExtension entitlement, disclose the VPN mechanism in onboarding, and obtain explicit user consent before establishing the VPN configuration.
- **Example rejection:** "Your app installs a VPN configuration to filter network traffic but does not use the approved Content Blocker Extension API for this purpose and does not adequately disclose the VPN usage to users."

---

### Local Law Compliance and Regional Availability  ·  Guideline 5.4 / Legal Requirements  ·  WARNING
- **What to check:** VPN apps may be illegal or restricted in certain jurisdictions (e.g., VPN services in China require ICP licensing and government approval). Distributing a VPN app in a region where it violates local law can result in removal from that storefront.
- **How to detect:** Use `asc_get_metadata` to check the territory availability list. Flag availability in China, Russia, UAE, and other known VPN-restricted markets unless the developer has confirmed local compliance. Verify that the App Store Connect territory settings reflect legal availability.
- **Resolution:** Restrict availability to territories where VPN operation is legally permitted. For China distribution, obtain the required ICP license and submit through the appropriate channel. Document legal authorizations in App Review notes. Monitor Apple's published list of country-specific guideline overrides.
- **Example rejection:** "Your app has been removed from the [Country] App Store because it does not comply with local laws regarding VPN services. VPN apps must comply with all applicable laws in the regions where they are distributed."

---

### Clear Disclosure of Routed Traffic  ·  Guideline 5.4 / 5.1.1  ·  WARNING
- **What to check:** Users must understand what traffic is routed through the VPN (all traffic, split-tunnel, only specific apps), which server regions are used, and what the VPN's logging policy is before they connect. This must be disclosed in onboarding and in the app's settings.
- **How to detect:** Walk through the VPN onboarding flow manually. Verify a plain-language description of traffic routing appears before the VPN profile installation prompt. Use `asc_get_metadata` and review screenshots for any disclosure language. Check the privacy policy for a logging statement (no-log, minimal-log, or full-log) and verify it matches the in-app disclosure.
- **Resolution:** Add an onboarding screen summarizing: what traffic is routed, which countries' servers are used, and the logging policy. Surface the logging policy again in Settings. Ensure the App Store description and screenshots are consistent with these disclosures.
- **Example rejection:** "Your app does not adequately disclose to users what network traffic will be routed through the VPN or what information is logged, which is required for VPN apps under App Store Review Guideline 5.4."

---

**Cross-references:** `rule-privacy.md` (nutrition label and privacy policy requirements), `privacy-manifest` (SDK privacy manifest audit for embedded analytics).
