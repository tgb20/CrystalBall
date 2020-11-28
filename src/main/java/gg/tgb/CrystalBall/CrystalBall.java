package gg.tgb.CrystalBall;

import org.bukkit.plugin.java.JavaPlugin;
import io.javalin.Javalin;

public class CrystalBall extends JavaPlugin {

    @Override
    public void onEnable() {
        System.out.println("Crystal Ball is Starting");


        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        Thread.currentThread().setContextClassLoader(Javalin.class.getClassLoader());
        Javalin app = Javalin.create().start(8001);
        app.config.addStaticFiles("/public");
        Thread.currentThread().setContextClassLoader(classLoader);
    }

    @Override
    public void onDisable() {
        System.out.println("Crystal Ball is Stopping");
    }
}
