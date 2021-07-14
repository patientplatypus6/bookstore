import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.5.2"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	application
	kotlin("jvm") version "1.5.20"
	kotlin("plugin.spring") version "1.5.20"
}

application {
  mainClass.set("platypus.bookstore.BookstoreApplicationKt") 
}

group = "platypus.bookstore.spring-boot"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
	mavenCentral()
	// url "https://kotlin.bintray.com/kotlinx"
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("org.springframework.boot:spring-boot-starter-data-r2dbc")
	implementation("org.springframework.boot:spring-boot-starter-webflux")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")


	// need special cors filter if importing spring-boot-starter-security in project
	// using subpackages for crypo currently
	// implementation("org.springframework.boot:spring-boot-starter-security")
  // implementation("org.springframework.security:spring-security-test")
	implementation("org.springframework.security:spring-security-crypto:5.5.1")


	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.5.1")
	implementation("org.json:json:20210307")
	
	runtimeOnly("com.h2database:h2")
	runtimeOnly("dev.miku:r2dbc-mysql")
	runtimeOnly("io.r2dbc:r2dbc-h2")
	runtimeOnly("mysql:mysql-connector-java")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("io.projectreactor:reactor-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
