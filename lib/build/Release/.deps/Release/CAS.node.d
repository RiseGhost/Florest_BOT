cmd_Release/CAS.node := ln -f "Release/obj.target/CAS.node" "Release/CAS.node" 2>/dev/null || (rm -rf "Release/CAS.node" && cp -af "Release/obj.target/CAS.node" "Release/CAS.node")
