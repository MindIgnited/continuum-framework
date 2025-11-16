package org.kinotic.continuum.api.config;

/**
 * Ignite Cluster Configuration Properties
 * 
 * @author Navid Mitchell
 * @since 1.0.0
 * @version 1.0.0
 * @see IgniteClusterDiscoveryType
 * @see IgniteClusterDiscoveryType#LOCAL
 * @see IgniteClusterDiscoveryType#SHAREDFS
 * @see IgniteClusterDiscoveryType#KUBERNETES
 */
public interface IgniteClusterProperties {
    
    /**
     * Cluster discovery type for Apache Ignite.
     * Valid values: LOCAL, SHAREDFS, KUBERNETES
     * - LOCAL: Single-node, no clustering (default for development)
     * - SHAREDFS: Shared filesystem discovery (Docker/VM environments)
     * - KUBERNETES: Kubernetes discovery via K8s API
     */
    IgniteClusterDiscoveryType getDiscoveryType();

    /**
     * Timeout in milliseconds for cluster formation/join
     */
    Long getJoinTimeoutMs(); // 0 seconds (no timeout)
    
    /**
     * Comma-separated list of addresses for shared filesystem discovery.
     * Format: "host1:port1,host2:port2,host3:port3"
     * Only used when clusterDiscoveryType = "sharedfs"
     * Example: "node1:47500,node2:47500,node3:47500"
     */
    String getSharedFsPath();
    
    /**
     * Kubernetes namespace where Structures pods are deployed.
     * Only used when clusterDiscoveryType = "kubernetes"
     */
    String getKubernetesNamespace();
    
    /**
     * Kubernetes service name for Ignite discovery (headless service).
     * Only used when clusterDiscoveryType = "kubernetes"
     */
    String getKubernetesServiceName();

    /**
     * Whether to include not ready addresses in the Kubernetes IP finder
     */
    Boolean getKubernetesIncludeNotReadyAddresses();
    
    /**
     * Kubernetes master URL for API access.
     * If null, uses in-cluster configuration.
     * Only used when clusterDiscoveryType = "kubernetes"
     */
    String getKubernetesMasterUrl();
    
    /**
     * Kubernetes account token for API authentication.
     * If null, uses service account token from mounted secret.
     * Only used when clusterDiscoveryType = "kubernetes"
     */
    String getKubernetesAccountToken();
    
    /**
     * Port used for Ignite discovery protocol
     */
    Integer getDiscoveryPort();

    /**
     * Comma delimited string of network addresses that should be considered
     * when using LOCAL clustering. Should contain proper discovery port for address.
     */
    String getLocalAddresses();
    
    /**
     * Port used for Ignite node communication
     */
    Integer getCommunicationPort();

    // /**
    //  * Port used for Ignite JMX
    //  */
    // private Integer jmxPort = 49112;

    // /**
    //  * Port used for Ignite thin client/JDBC/ODBC
    //  */
    // private Integer thinClientPort = 10800;

    // /**
    //  * Port used for Ignite REST API
    //  */
    // private Integer restApiPort = 8080;

    // /**
    //  * Port used for Ignite control script
    //  */
    // private Integer controlScriptPort = 11211;
    
}
